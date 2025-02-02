import Projects from "../pages/Projects";
import Works from "../pages/Works";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    PROJECTS = "/",
    WORKS = "/:id",
}

export const publicRoutes = [
    {
        path: RouteNames.PROJECTS,
        component: Projects,
    },
    {
        path: RouteNames.WORKS,
        component: Works,
    },
];
