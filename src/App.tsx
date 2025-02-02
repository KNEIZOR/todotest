import React, { useEffect } from "react";
import "./styles/app.scss";
import AppRouter from "./components/AppRouter";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { GetProjectsAction } from "./store/action-creators/todo";

function App() {
    const dispatch = useDispatch()

    function getProjects() {
        const projects = JSON.parse(localStorage.getItem("projects") || "[]")
        dispatch(GetProjectsAction(projects))
    }

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className="App">
            <Header />
            <AppRouter />
        </div>
    );
}

export default App;
