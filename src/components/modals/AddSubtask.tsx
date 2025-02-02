import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddSubtaskAction } from "../../store/action-creators/todo";
import { ITodo } from "../../types/todoType";

const AddSubtask = ({ setIsModal, board, item, todo }: any) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function addSubtask() {
        const newSubtask = {
            id: `${Date.now()}`,
            title: title ? title : "Subtask",
            isComplete: false,
            description,
        }
        dispatch(AddSubtaskAction([todo.id, board.id, item.id, newSubtask]))

        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((localTodo:ITodo) => {
            if(localTodo.id === todo.id){
                localTodo.boards.map(localBoard => {
                    if(localBoard.id === board.id){
                        localBoard.tasks.map(localTask => {
                            if(localTask.id === item.id) {
                                localTask.subtasks.push(newSubtask)
                            }
                            return localTask
                        })
                    }
                    return localBoard
                })
            }
            return localTodo
        })
        localStorage.setItem("projects", JSON.stringify(todoArr));

        setIsModal(false)
    }

    function closeModal(e: any) {
        const modal = e.target.closest(".modal");
        if (modal) return;
        setIsModal(false);
    }
    return (
        <div className="modal__wrapper" onClick={(e) => closeModal(e)}>
            <div className="modal">
                <h2>Add subtask</h2>
                <div className="inputs">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        type="text"
                        placeholder="Enter title"
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        placeholder="Enter description"
                    />
                </div>
                <div className="buttons">
                    <button className="close" onClick={() => setIsModal(false)}>
                        close
                    </button>
                    <button className="add" onClick={addSubtask}>
                        Add subtask
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSubtask;
