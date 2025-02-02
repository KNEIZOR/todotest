import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTodoAction, AddWorkAction } from "../../store/action-creators/todo";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ITodo } from "../../types/todoType";
import "../../styles/addTodoModal.scss";

const AddTodoModal = ({ setIsModal }: any) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [endDate, setEndDate] = useState("not specified");
    const [file, setFile] = useState("");
    const isProject = useTypedSelector((state) => state.todo.isProject);
    const urlId = window.location.href.split("/").reverse()[0];

    function addTodo() {
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        const newTodo = {
            id: `${Date.now()}`,
            title: title ? title : "Project",
            boards: [
                {
                    id: "1",
                    title: "Queue",
                    tasks: [],
                },
                {
                    id: "2",
                    title: "Development",
                    tasks: [],
                },
                {
                    id: "3",
                    title: "Done",
                    tasks: [],
                },
            ],
        };

        dispatch(AddTodoAction(newTodo));
        todoArr.push(newTodo);
        localStorage.setItem("projects", JSON.stringify(todoArr));
        setIsModal(false);
    }

    function addWork() {
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");

        const newTask = {
            id: `${Date.now()}`,
            title: title ? title : "Work",
            description,
            dateNow: Date.now(),
            createDate: new Date().toLocaleString(),
            endDate,
            priority,
            file,
            status: "Qeue",
            subtasks: [],
            comments: [],
        };
        todoArr.map((todo: ITodo) => {
            if (todo.id === urlId) {
                todo.boards[0].tasks.push(newTask);
            }
            return todo;
        });

        dispatch(AddWorkAction([newTask, urlId]));

        localStorage.setItem("projects", JSON.stringify(todoArr));
        setIsModal(false);
    }

    function closeModal(e: any) {
        const modal = e.target.closest(".modal");
        if (modal) return;
        setIsModal(false);
    }

    return (
        <div className="modal__wrapper" onClick={(e) => closeModal(e)}>
            {isProject ? (
                <div className="modal">
                    <h2>Create project</h2>
                    <div className="inputs">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                            type="text"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="buttons">
                        <button
                            className="close"
                            onClick={() => setIsModal(false)}
                        >
                            close
                        </button>
                        <button className="add" onClick={addTodo}>
                            Create project
                        </button>
                    </div>
                </div>
            ) : (
                <div className="modal">
                    <h2>Create work</h2>
                    <div className="inputs">
                        <input
                            value={title}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter title"
                        />
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Enter description"
                        />
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="datetime-local"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input
                            className="input-file"
                            onChange={(e) =>
                                setFile(
                                    e.target.files ? e.target.files[0].name : ""
                                )
                            }
                            type="file"
                        />
                    </div>

                    <div className="buttons">
                        <button
                            className="close"
                            onClick={() => setIsModal(false)}
                        >
                            close
                        </button>
                        <button className="add" onClick={addWork}>
                            add work
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTodoModal;
