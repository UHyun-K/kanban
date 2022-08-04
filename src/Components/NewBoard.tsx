import styled from "styled-components";

import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";
const Wrapper = styled.div`
    width: 100%;
    background: pink;
    display: flex;
    h1 {
    }
    input {
    }
`;
interface INewBoardName {
    newBoardName: string;
}

function NewBoard() {
    const { register, setValue, handleSubmit } = useForm<INewBoardName>();
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onValid = ({ newBoardName }: INewBoardName) => {
        if (!newBoardName) return;
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [newBoardName]: [],
            };
        });
    };
    return (
        <Wrapper>
            <h1>Create new board</h1>
            <form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("newBoardName", { required: true })}
                    type="text"
                    placeholder="Please type board name and press enter to create"
                />
            </form>
        </Wrapper>
    );
}
export default NewBoard;
