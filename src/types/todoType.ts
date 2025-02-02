export interface ITodoState {
    todos: ITodo[];
    isProject: boolean;
}

export interface ITodo {
    id: string;
    title: string;
    boards: IBoard[];
}

export interface IBoard {
    id: string;
    title: string;
    tasks: ITask[];
}

export interface ITask {
    id: string;
    title: string;
    description: string;
    createDate: string;
    endDate: string;
    priority: string;
    file: string;
    dateNow: number;
    status: string;
    subtasks: any[];
    comments: any[];
}

export enum TodoAction {
    ADD_PROJECT = "ADD_PROJECT",
    DELETE_PROJECT = "DELETE_PROJECT",
    GET_PROJECTS = "GET_PROJECTS",
    SET_IS_PROJECT = "SET_IS_PROJECT",
    ADD_WORK = "ADD_WORK",
    SET_BOARD = "SET_BOARD",
    EDIT_PROJECT = "EDIT_PROJECT",
    DELETE_TASK = "DELETE_TASK",
    EDIT_TASK = "EDIT_TASK",
    ADD_SUBTASK = "ADD_SUBTASK",
    ADD_COMMENT = "ADD_COMMENT",
    SET_SUBTASK_COMPLETED = "SET_SUBTASK_COMLETED",
    DELETE_SUBTASK = "DELETE_SUBTASK",
    DELETE_COMMENT = "DELETE_COMMENT",
}
