import React, { FC } from "react";
import { IBoard, ITask, ITodo } from "../types/todoType";
import { useDispatch } from "react-redux";
import { DeleteSubtaskAction } from "../store/action-creators/todo";

interface ISubtaskProps {
    subtask: ITask;
    index: number;
    board: IBoard;
    todo: ITodo;
    task: ITask;
}

const SubtaskComponent: FC<ISubtaskProps> = ({
    subtask,
    index,
    board,
    task,
    todo,
}) => {
    const dispatch = useDispatch();

    function deleteSubtask() {
        dispatch(DeleteSubtaskAction([todo.id, board.id, task.id, subtask.id]));

        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((localTodo: ITodo) => {
            if (localTodo.id === todo.id) {
                localTodo.boards.map((localBoard) => {
                    if (localBoard.id === board.id) {
                        localBoard.tasks.map((localTask) => {
                            if (localTask.id === task.id) {
                                localTask.subtasks = localTask.subtasks.filter(
                                    (localSubtask) =>
                                        localSubtask.id !== subtask.id
                                );
                            }
                            return localTask;
                        });
                    }
                    return localBoard;
                });
            }
            return localTodo;
        });
        localStorage.setItem("projects", JSON.stringify(todoArr));
    }

    return (
        <div className="subtask">
            <div className="subtask-top">
                <div className="subtask-number">
                    {index + 1}. {subtask.title}
                </div>
                <div className="subtask-buttons">
                    <button className="edit">
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    <button className="close" onClick={() => deleteSubtask()}>
                        <i className="fa-solid fa-delete-left"></i>
                    </button>
                </div>
            </div>
            <div className="subtask-description">
                Description: {subtask.description}
            </div>
        </div>
    );
};

export default SubtaskComponent;
