import React, { useState } from "react";
import "../styles/header.scss";
import AddTodoModal from "./modals/AddTodoModal";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Header = () => {
    const [isModal, setIsModal] = useState(false);
    const navigate = useNavigate();
    const isProject = useTypedSelector((state) => state.todo.isProject);

    return (
        <>
            {isModal && <AddTodoModal setIsModal={setIsModal} />}
            <header>
                <div
                    className="logo"
                    onClick={() => navigate(RouteNames.PROJECTS)}
                >
                    Todo App
                </div>
                <div className="search">
                    <input type="text" placeholder="Enter name projects" />
                </div>
                <div className="add-project">
                    <button onClick={() => setIsModal(true)} className="add">
                        {isProject ? "Add project" : "Add work"}
                    </button>
                </div>
            </header>
        </>
    );
};

export default Header;
