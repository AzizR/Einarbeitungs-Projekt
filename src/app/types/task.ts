import { Priority } from "./priority";

export interface Task {
    id: string,
    name: string,
    description: string,
    deadline: string,
    priority: Priority,
    isDone: boolean
}