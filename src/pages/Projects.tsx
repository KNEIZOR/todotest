import React, { useEffect, useState } from "react";
import "../styles/projects.scss";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    DeleteTodoAction,
    SetIsProjectAction,
} from "../store/action-creators/todo";
import EditTodoModal from "../components/modals/EditTodoModal";

const Projects = () => {
    const [isModal, setIsModal] = useState(false);
    const [mainTodo, setMainTodo] = useState({
        id: "1",
        title: "",
        boards: [],
    });
    const { todos } = useTypedSelector((state) => state.todo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function deleteProject(id: string) {
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        dispatch(DeleteTodoAction(id));
        const newTodoArr = todoArr.filter((todo: any) => todo.id !== id);
        localStorage.setItem("projects", JSON.stringify(newTodoArr));
    }

    useEffect(() => {
        dispatch(SetIsProjectAction(true));
    }, []);

    return (
        <>
            {isModal && (
                <EditTodoModal setIsModal={setIsModal} todo={mainTodo} />
            )}
            <div className="projects-page">
                <h1>Projects:</h1>
                <div className="projects">
                    {todos.length <= 0 ? (
                        <h2>No projects</h2>
                    ) : (
                        todos.map((todo: any) => (
                            <div className="todo" key={todo.id}>
                                <div className="todo-top">
                                    <div className="todo-title">
                                        {todo.title}
                                    </div>
                                    <button className="edit"
                                        onClick={() => [
                                            setIsModal(true),
                                            setMainTodo(todo),
                                        ]}
                                    >
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                </div>
                                <div className="todo-buttons">
                                    <button
                                        onClick={() => navigate(`/${todo.id}`)}
                                        className="open"
                                    >
                                        Open
                                    </button>
                                    <button
                                        onClick={() => deleteProject(todo.id)}
                                        className="close"
                                    >
                                        <i className="fa-solid fa-square-minus"></i>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Projects;
