import { atom, selector } from "recoil";

export interface ITodo {
    id: number;
    text: string;
}
interface IToDoState {
    [key: string]: ITodo[];
}
export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": ["a", "b"],
        Doing: ["c", "d"],
        Done: ["e", "f"],
        "Do Later": ["g"],
    },
});
