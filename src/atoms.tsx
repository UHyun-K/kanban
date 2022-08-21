import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
        "To Do": [],
        Doing: [],
        Done: [],
    },
    effects_UNSTABLE: [persistAtom],
});

/* export const editState = atom<string>({
    key: "edit",
    default: '',
});
 */
/* export const boardNameEditSelector = selector<IToDoState>({
    key:"boardNameEdit",
    get: ({get}) => {
        const Boards = get(toDoState);
        return Boards;
    },
    set:({set},newValue)=>{
        const newName = newValue;
        set((toDoState)=>
            ...toDoState,

        )
    }
}); */
