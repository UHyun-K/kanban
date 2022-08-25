import styled from "styled-components";

import { useForm } from "react-hook-form";
import { toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { TbNote } from "react-icons/tb";
import { VscDiffAdded } from "react-icons/vsc";
const Wrapper = styled.div`
    width: 100%;

    display: flex;
    padding: 10px 0;
`;
const Title = styled.h1`
    width: 30%;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    color: #fff;
    &::after {
        content: "|";
        float: right;
        display: block;
        color: gray;
    }
`;
const Form = styled.div`
    width: 60%;
    vertical-align: middle;
    align-items: center;
    input {
        width: 80%;
        background: white;
        border: none;
        padding: 10px 5px;
        height: 33px;
    }
    button {
        justify-content: center;
        vertical-align: middle;
        background-color: white;
        width: 5%;
        height: 33px;
        margin-right: 10px;
        .add {
            vertical-align: middle;
            color: blue;
            font-size: 25px;
        }
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
        setValue("newBoardName", "");
    };
    return (
        <Wrapper>
            <Title>
                <TbNote />
                <strong> ChopChop!</strong>
            </Title>
            <Form>
                <form onSubmit={handleSubmit(onValid)}>
                    <input
                        {...register("newBoardName", { required: true })}
                        type="text"
                        placeholder="추가할 제목을 입력하세요"
                    />
                    <button>
                        <VscDiffAdded className="add" />
                    </button>
                </form>
            </Form>
        </Wrapper>
    );
}
export default NewBoard;
