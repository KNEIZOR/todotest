import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "../styles/works.scss";
import {
    SetBoardAction,
    SetIsProjectAction,
} from "../store/action-creators/todo";
import { ITodo } from "../types/todoType";
import BoardComponent from "../components/BoardComponent";

const Works = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { todos } = useTypedSelector((state) => state.todo);
    const [work, setWork] = useState({ id: "1", title: "title", boards: [] });
    const [boards, setBoards] = useState([
        {
            id: "1",
            title: "",
            tasks: [
                {
                    id: "1",
                    number: 1,
                    title: "",
                    description: "",
                    createDate: new Date().toLocaleString(),
                    dateNow: Date.now(),
                    endDate: "",
                    priority: "",
                    file: "",
                    status: "",
                    subtasks: [],
                    comments: [],
                },
            ],
        },
    ]);
    const [currentBoard, setCurrentBoard] = useState({
        id: "1",
        title: "",
        tasks: [
            {
                id: "1",
                number: 1,
                title: "",
                description: "",
                createDate: new Date().toLocaleString(),
                dateNow: Date.now(),
                endDate: "",
                priority: "",
                file: {},
                status: "",
                subtasks: [],
                comments: [],
            },
        ],
    });
    const [currentWork, setCurrentWork] = useState({
        id: "1",
        number: 1,
        title: "",
        description: "",
        createDate: new Date().toLocaleString(),
        dateNow: Date.now(),
        endDate: "",
        priority: "",
        file: "",
        status: "",
        subtasks: [],
        comments: [],
    });

    let countCompleted = 0;
    let completedMax = boards
        .map((board) => board.tasks.length)
        .reduce((sum, i) => sum + i, 0);

    boards.map((board) => {
        if (board.title === "Done") {
            countCompleted = board.tasks.length;
        }
        return board;
    });

    function getWorkById() {
        const mainWork = todos.find((todo) => todo.id === params.id);
        setWork(mainWork);
        setBoards(mainWork?.boards || []);
    }

    function dragOverHandler(e: any) {
        e.preventDefault();
        if (e.target.className === "work") {
            e.target.style.boxShadow = "0 2px 3px red";
        }
    }
    function dragStartHandler(e: any, board: any, work: any) {
        setCurrentBoard(board);
        setCurrentWork(work);
    }
    function dragLeaveHandler(e: any) {
        e.target.style.boxShadow = "none";
    }
    function dragEndHandler(e: any) {
        e.target.style.boxShadow = "none";
    }
    function dropHandler(e: any, board: any, work: any) {
        e.stopPropagation();
        e.preventDefault();
        const currentIndex = currentBoard.tasks.indexOf(currentWork);
        currentBoard.tasks.splice(currentIndex, 1);
        const dropIndex = board.tasks.indexOf(work);
        board.tasks.splice(dropIndex + 1, 0, currentWork);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
        dispatch(SetBoardAction([boards, work.id]));
        e.target.style.boxShadow = "none";
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((todo: ITodo) => (todo.boards = boards));
        localStorage.setItem("projects", JSON.stringify(todoArr));
    }

    function dropCardHandler(e: any, board: any) {
        e.stopPropagation();
        board.tasks.push(currentWork);
        const currentIndex = currentBoard.tasks.indexOf(currentWork);
        currentBoard.tasks.splice(currentIndex, 1);
        setBoards(
            boards.map((b) => {
                if (b.id === board.id) {
                    return board;
                }
                if (b.id === currentBoard.id) {
                    return currentBoard;
                }
                return b;
            })
        );
        const todoArr = JSON.parse(localStorage.getItem("projects") || "[]");
        todoArr.map((todo: ITodo) => (todo.boards = boards));
        localStorage.setItem("projects", JSON.stringify(todoArr));
    }

    useEffect(() => {
        getWorkById();
        dispatch(SetIsProjectAction(false));
    }, [todos]);

    return (
        <div className="works">
            <h2>{work ? work.title : "title"}</h2>
            <h2>
                Completed Task: {countCompleted} | {completedMax}
            </h2>
            <div className="works-columns">
                {boards.map((board) => (
                    <BoardComponent
                        key={board.id}
                        dragOverHandler={dragOverHandler}
                        board={board}
                        dragEndHandler={dragEndHandler}
                        dragLeaveHandler={dragLeaveHandler}
                        dragStartHandler={dragStartHandler}
                        dropCardHandler={dropCardHandler}
                        dropHandler={dropHandler}
                        todo={work}
                    />
                ))}
            </div>
        </div>
    );
};

export default Works;
