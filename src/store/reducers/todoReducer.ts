import { ITodoState, TodoAction } from "./../../types/todoType";

const initialState: ITodoState = {
    todos: [],
    isProject: true,
};

export const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case TodoAction.ADD_PROJECT:
            return { ...state, todos: [...state.todos, action.payload] };

        case TodoAction.DELETE_PROJECT:
            return {
                ...state,
                todos: state.todos.filter((i) => i.id !== action.payload),
            };

        case TodoAction.GET_PROJECTS:
            return {
                ...state,
                todos: [...state.todos, ...action.payload],
            };

        case TodoAction.SET_IS_PROJECT:
            return {
                ...state,
                isProject: action.payload,
            };

        case TodoAction.ADD_WORK:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[1]) {
                        todo.boards[0].tasks = [
                            ...todo.boards[0].tasks,
                            action.payload[0],
                        ];
                    }
                    return todo;
                }),
            };

        case TodoAction.SET_BOARD:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[1]) {
                        todo.boards = action.payload[0];
                    }
                    return todo;
                }),
            };

        case TodoAction.EDIT_PROJECT:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[1]) {
                        todo.title = action.payload[0];
                    }
                    return todo;
                }),
            };

        case TodoAction.DELETE_TASK:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks = board.tasks.filter(
                                    (task) => task.id !== action.payload[2]
                                );
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        case TodoAction.EDIT_TASK:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks.map((task) => {
                                    if (task.id === action.payload[2]) {
                                        task.title = action.payload[3]?.title;
                                        task.description =
                                            action.payload[3]?.description;
                                        task.priority =
                                            action.payload[3]?.priority;
                                        task.endDate =
                                            action.payload[3]?.endDate;
                                        task.file = action.payload[3]?.file;
                                        task.comments =
                                            action.payload[3]?.comments;
                                    }
                                    return task;
                                });
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        case TodoAction.ADD_SUBTASK:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks.map((task) => {
                                    if (task.id === action.payload[2]) {
                                        task.subtasks = [
                                            ...task.subtasks,
                                            action.payload[3],
                                        ];
                                    }
                                    return task;
                                });
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        case TodoAction.DELETE_SUBTASK:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks.map((task) => {
                                    if (task.id === action.payload[2]) {
                                        task.subtasks = task.subtasks.filter(
                                            (subtask) =>
                                                subtask.id !== action.payload[3]
                                        );
                                    }
                                    return task;
                                });
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        case TodoAction.ADD_COMMENT:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks.map((task) => {
                                    if (task.id === action.payload[2]) {
                                        task.comments = [
                                            ...task.comments,
                                            action.payload[3],
                                        ];
                                    }
                                    return task;
                                });
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        case TodoAction.DELETE_COMMENT:
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload[0]) {
                        todo.boards.map((board) => {
                            if (board.id === action.payload[1]) {
                                board.tasks.map((task) => {
                                    if (task.id === action.payload[2]) {
                                        task.comments = task.comments.filter(
                                            (comment) =>
                                                comment.id !== action.payload[3]
                                        );
                                    }   
                                    return task;
                                });
                            }
                            return board;
                        });
                    }
                    return todo;
                }),
            };

        default:
            return state;
    }
};
