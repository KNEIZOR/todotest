import React from "react";
import { useDispatch } from "react-redux";
import { DeleteCommentAction } from "../store/action-creators/todo";
import { ITodo } from "../types/todoType";

const CommentComponent = ({ comment, index, todo, board, task }: any) => {
    const dispatch = useDispatch();

    function deleteComment() {
        dispatch(DeleteCommentAction([todo.id, board.id, task.id, comment.id]));

        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((localTodo: ITodo) => {
            if (localTodo.id === todo.id) {
                localTodo.boards.map((localBoard) => {
                    if (localBoard.id === board.id) {
                        localBoard.tasks.map((localTask) => {
                            if (localTask.id === task.id) {
                                localTask.comments = localTask.comments.filter(
                                    (localComment) =>
                                        localComment.id !== comment.id
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
        <div className="comment">
            <div className="comment-number">
                {index + 1}. {comment.title}
            </div>
            <div className="comment-buttons">
                <button className="edit">
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button className="close" onClick={() => deleteComment()}>
                    <i className="fa-solid fa-delete-left"></i>
                </button>
            </div>
        </div>
    );
};

export default CommentComponent;
