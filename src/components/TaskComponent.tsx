import React, { FC, useEffect, useState } from "react";
import { IBoard, ITask, ITodo } from "../types/todoType";
import { useDispatch } from "react-redux";
import {
    AddCommentAction,
    DeleteTaskAction,
} from "../store/action-creators/todo";
import EditTodoModal from "./modals/EditTodoModal";
import SubtaskComponent from "./SubtaskComponent";
import AddSubtask from "./modals/AddSubtask";
import CommentComponent from "./CommentComponent";

interface ItaskComponentProps {
    dragOverHandler: (e: React.DragEvent) => void;
    dragLeaveHandler: (e: React.DragEvent) => void;
    dragEndHandler: (e: React.DragEvent) => void;
    dragStartHandler: (e: React.DragEvent, board: IBoard, item: ITask) => void;
    dropHandler: (e: React.DragEvent, board: IBoard, item: ITask) => void;
    board: IBoard;
    item: ITask;
    index: number;
    todo: ITodo;
}

const TaskComponent: FC<ItaskComponentProps> = ({
    board,
    dragEndHandler,
    dragLeaveHandler,
    dragOverHandler,
    dragStartHandler,
    dropHandler,
    item,
    index,
    todo,
}) => {
    const [isModal, setIsModal] = useState(false);
    const [isModalSubtask, setIsModalSubtask] = useState(false);
    const [commentTitle, setCommentTitle] = useState("");
    const dispatch = useDispatch();
    const [dateNow, setDateNow] = useState(Date.now());
    const date = item.createDate;
    const resultDate = date.replace(",", "")
    let nowSec = Math.floor((dateNow - item.dateNow) / 1000);
    let nowMin = Math.floor(nowSec / 60);
    let nowHour = Math.floor(nowMin / 60);  
    let nowDay = Math.floor(nowHour / 24);
    const endDate = item.endDate.replace("T", " ");
    const endTime = endDate.split(" ")[1];
    const resultEndDate = endDate.split(" ")[0].split("-").reverse().join(".");

    if (nowSec >= 60) {
        nowSec = nowSec % 60;
    }

    if (nowMin >= 60) {
        nowMin = nowMin % 60;
    }

    if (nowHour >= 24) {
        nowHour = nowHour % 24;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDateNow(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    function deleteTask(id: string) {
        dispatch(DeleteTaskAction([todo.id, board.id, id]));
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((todoLocal: ITodo) => {
            if (todoLocal.id === todo.id) {
                todoLocal.boards.map((boardLocal) => {
                    if (boardLocal.id === board.id) {
                        boardLocal.tasks = boardLocal.tasks.filter(
                            (task) => task.id !== id
                        );
                    }
                    return boardLocal;
                });
            }
            return todoLocal;
        });
        localStorage.setItem("projects", JSON.stringify(todoArr));
    }

    function addComment() {
        const newComment = {
            id: `${Date.now()}`,
            title: commentTitle,
        };
        dispatch(AddCommentAction([todo.id, board.id, item.id, newComment]));

        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((localTodo: ITodo) => {
            if (localTodo.id === todo.id) {
                localTodo.boards.map((localBoard) => {
                    if (localBoard.id === board.id) {
                        localBoard.tasks.map((localTask) => {
                            if (localTask.id === item.id) {
                                localTask.comments.push(newComment);
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

        setCommentTitle("");
    }

    return (
        <>
            {isModal && (
                <EditTodoModal
                    setIsModal={setIsModal}
                    todo={todo}
                    item={item}
                    board={board}
                />
            )}
            {isModalSubtask && (
                <AddSubtask
                    setIsModal={setIsModalSubtask}
                    todo={todo}
                    item={item}
                    board={board}
                />
            )}
            <div
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
                className="work"
            >
                <div className="top-item">
                    <div className="item-num">
                        {index + 1}. {item.title}
                    </div>
                    <div className="task-buttons">
                        <button className="edit" onClick={() => setIsModal(true)}><i className="fa-solid fa-pen"></i></button>
                        <button
                            onClick={() => deleteTask(item.id)}
                            className="close"
                        >
                            <i className="fa-solid fa-delete-left"></i>
                        </button>
                    </div>
                </div>
                <div className="bottom-item">
                    <div className="item-description">Description: {item.description}</div>
                    <div className="item-number">№ {item.id}</div>
                    <div className={`item-priority ${item.priority}`}>
                        Priority: {item.priority}
                    </div>
                    <div className="item-createDate">Created: {resultDate}</div>
                    <div className="item-endDate">
                        Date ending: {`${resultEndDate} ${endTime}`}
                    </div>
                    <div className="item-nowDate">
                        Time at work: {`${nowDay}d ${nowHour}h ${nowMin}m ${nowSec}s`}
                    </div>
                    <div className="item-file">File: {item.file}</div>
                    <div className="item-subtasks">
                        <h2>Subtasks:</h2>
                        {item.subtasks.map((subtask, index) => (
                            <SubtaskComponent
                                key={subtask.id}
                                subtask={subtask}
                                index={index}
                                board={board}
                                todo={todo}
                                task={item}
                            />
                        ))}
                    </div>
                    <button
                        className="add btn-subtask"
                        onClick={() => setIsModalSubtask(true)}
                    >
                        add subtask
                    </button>
                    <div className="item-comments">
                        <h2>Comments:</h2>
                        {item.comments.map((comment, index) => (
                            <CommentComponent
                                key={comment.id}
                                comment={comment}
                                index={index}
                                board={board}
                                todo={todo}
                                task={item}
                            />
                        ))}
                    </div>
                    <div className="add-comment">
                        <input
                            type="text"
                            placeholder="Enter comment"
                            value={commentTitle}
                            onChange={(e) => setCommentTitle(e.target.value)}
                        />
                        <button className="add" onClick={() => addComment()}>
                            add comment
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskComponent;
