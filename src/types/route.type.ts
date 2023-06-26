import { FunctionComponent } from "react";

export interface Route {
    path: string;
    element: FunctionComponent<any>;
    layout?: FunctionComponent<any>;
}