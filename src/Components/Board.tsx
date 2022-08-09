import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { VscClose } from "react-icons/vsc";

const style = {
    color: "red",
};
const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    div {
        display: flex;
    }
`;
const Title = styled.h1`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;
interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
    background-color: ${(prop) =>
        prop.isDraggingOver
            ? "#dfe6e9"
            : prop.isDraggingFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;

    input {
        width: 100%;
    }
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
}
interface IForm {
    toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({ toDo }: IForm) => {
        const newToDo = {
            id: Date.now(),
            text: toDo,
        };
        setToDos((allBoards) => {
            return {
                ...allBoards,
                [boardId]: [...allBoards[boardId], newToDo],
            };
        });
        setValue("toDo", "");
    };
    const onClick = (event: React.MouseEvent<SVGElement>) => {
        setToDos((allBoards) => {
            const BoardCopy = { ...allBoards };
            console.log(BoardCopy);
            delete BoardCopy[boardId];
            return BoardCopy;
        });
    };
    return (
        <Wrapper>
            <div>
                <Title>{boardId}</Title>
                <VscClose style={style} onClick={onClick} />
            </div>

            <Form onSubmit={handleSubmit(onValid)}>
                <input
                    {...register("toDo", { required: true })}
                    type="text"
                    placeholder={`Add task to doing`}
                />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                    <Area
                        isDraggingOver={snapshot.isDraggingOver}
                        isDraggingFromThis={Boolean(
                            snapshot.draggingFromThisWith
                        )}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {toDos.map((toDo, index) => (
                            <DraggableCard
                                key={toDo.id}
                                index={index}
                                toDoId={toDo.id}
                                toDoText={toDo.text}
                                boardId={boardId}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;
