import React, { FC, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import "../../styles/editTodoModal.scss";
import { IBoard, ITask, ITodo } from "../../types/todoType";
import {
    EditProjectAction,
    EditTaskAction,
} from "../../store/action-creators/todo";

interface IEditTodoModalProps {
    setIsModal: (value: boolean) => void;
    todo: ITodo;
    item?: ITask;
    board?: IBoard;
}

const EditTodoModal: FC<IEditTodoModalProps> = ({
    setIsModal,
    todo,
    item,
    board,
}) => {
    const dispatch = useDispatch();
    const [description, setDescription] = useState(item?.description);
    const [priority, setPriority] = useState(item?.priority);
    const [endDate, setEndDate] = useState(item?.endDate);
    const [file, setFile] = useState(item?.file);
    const isProject = useTypedSelector((state) => state.todo.isProject);
    const [title, setTitle] = useState(isProject ? todo.title : item?.title);

    function editProject() {
        dispatch(EditProjectAction([title ? title : "", todo.id]));
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((todolocal: ITodo) => {
            if (todolocal.id === todo.id) {
                title ? (todolocal.title = title) : (todolocal.title = "");
            }
            return todolocal;
        });
        localStorage.setItem("projects", JSON.stringify(todoArr));
        setIsModal(false);
    }

    function editWork() {
        const newTask = {
            ...item,
            title: title || "",
            description: description || "",
            priority: priority || "",
            file: file || "",
            comments: item?.comments || [],
            endDate: endDate || "",
        };
        dispatch(
            EditTaskAction([todo.id, board?.id, item ? item.id : "1", newTask])
        );
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((todolocal: ITodo) => {
            if (todolocal.id === todo.id) {
                todolocal.boards.map((localBoard) => {
                    if (localBoard.id === (board ? board?.id : "1")) {
                        localBoard.tasks.map((localTask) => {
                            if (localTask.id === item?.id) {
                                localTask.title = title || "";
                                localTask.description = description || "";
                                localTask.priority = priority || "";
                                localTask.endDate = endDate || "";
                                localTask.file = file || "";
                            }
                            return localTask;
                        });
                    }
                    return localBoard;
                });
            }
            return todolocal;
        });
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
                    <h2>Edit project</h2>
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
                        <button className="add" onClick={editProject}>
                            edit project
                        </button>
                    </div>
                </div>
            ) : (
                <div className="modal">
                    <h2>Edit work</h2>
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
                                setFile(e.target.files ? e.target.files[0].name : "")
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
                        <button className="add" onClick={editWork}>
                            edit work
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTodoModal;
