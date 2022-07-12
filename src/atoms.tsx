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
        "To Do": [{id:1, text:"Hello"}, {id:2, text:"bye"}],
        Doing: [],
        Done: [],
    },
});
