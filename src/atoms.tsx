import { atom } from "recoil";
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
        "장 볼 목록": [
            { id: 0, text: "당근🥕" },
            { id: 1, text: "감자🥔" },
            { id: 2, text: "오레오즈🖤" },
            { id: 3, text: "김밥 김🍙" },
        ],
        "할 일": [{ id: 44, text: "유산소 운동 30분" }],
        "진행 중": [
            { id: 22, text: "칸반 프로젝트 마무리" },
            { id: 33, text: "프로젝트 기록 남기기" },
        ],
    },
    effects_UNSTABLE: [persistAtom],
});
