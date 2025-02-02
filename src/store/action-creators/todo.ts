import { IBoard, ITask, ITodo, TodoAction } from "../../types/todoType";

export const AddTodoAction = (payload: ITodo) => ({
    type: TodoAction.ADD_PROJECT,
    payload,
});

export const DeleteTodoAction = (payload: string) => ({
    type: TodoAction.DELETE_PROJECT,
    payload,
});

export const GetProjectsAction= (payload: ITodo[]) => ({
    type: TodoAction.GET_PROJECTS,
    payload,
});

export const SetIsProjectAction= (payload: boolean) => ({
    type: TodoAction.SET_IS_PROJECT,
    payload
});

export const AddWorkAction= (payload: [ITask, string]) => ({
    type: TodoAction.ADD_WORK,
    payload
});

export const SetBoardAction= (payload: [IBoard[], string]) => ({
    type: TodoAction.SET_BOARD,
    payload
});

export const EditProjectAction= (payload: [string, string]) => ({
    type: TodoAction.EDIT_PROJECT,
    payload
});

export const DeleteTaskAction= (payload: string[]) => ({
    type: TodoAction.DELETE_TASK,
    payload
});

export const EditTaskAction= (payload: any[]) => ({
    type: TodoAction.EDIT_TASK,
    payload
});

export const AddSubtaskAction= (payload: any[]) => ({
    type: TodoAction.ADD_SUBTASK,
    payload
});

export const AddCommentAction= (payload: any[]) => ({
    type: TodoAction.ADD_COMMENT,
    payload
});

export const DeleteSubtaskAction= (payload: any[]) => ({
    type: TodoAction.DELETE_SUBTASK,
    payload
});

export const DeleteCommentAction= (payload: any[]) => ({
    type: TodoAction.DELETE_COMMENT,
    payload
});

export const SetSubtaskIsCompleteAction= (payload: any[]) => ({
    type: TodoAction.SET_SUBTASK_COMPLETED,
    payload
});
