import React, { FC } from "react";
import { IBoard, ITask, ITodo } from "../types/todoType";
import TaskComponent from "./TaskComponent";

interface IBoardComponentProps {
    dragOverHandler: (e: React.DragEvent) => void;
    dragLeaveHandler: (e: React.DragEvent) => void;
    dragEndHandler: (e: React.DragEvent) => void;
    dropCardHandler: (e: React.DragEvent, board: IBoard) => void;
    dragStartHandler: (e: React.DragEvent, board: IBoard, item: ITask) => void;
    dropHandler: (e: React.DragEvent, board: IBoard, item: ITask) => void;
    board: IBoard;
    todo: ITodo;
}

const BoardComponent: FC<IBoardComponentProps> = ({
    dragOverHandler,
    dropCardHandler,
    board,
    dragLeaveHandler,
    dragStartHandler,
    dragEndHandler,
    dropHandler,
    todo,
}) => {
    return (
        <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className={`column ${board.title}`}
        >
            <div className="board-title">{board.title}</div>
            <div className="tasks">
                {board.tasks.map((item, index) => (
                    <TaskComponent
                        key={item.id}
                        board={board}
                        todo={todo}
                        dragEndHandler={dragEndHandler}
                        dragLeaveHandler={dragLeaveHandler}
                        dragOverHandler={dragOverHandler}
                        dragStartHandler={dragStartHandler}
                        dropHandler={dropHandler}
                        index={index}
                        item={item}
                    />
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
