import { useForm } from "react-hook-form";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { VscClose, VscSymbolColor } from "react-icons/vsc";
const style = {
    color: "red",
};
const Icons = styled.div`
    opacity: 0;
    display: flex;
    transition: opacity ease-in 0.1s;
`;
const Wrapper = styled.div`
    width: 300px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    div {
        display: flex;
    }
    &:hover {
        ${Icons} {
            opacity: 1;
        }
    }
`;

const Title = styled.h1`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
    display: flex;
    flex-grow: 3;
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
    flex-direction: column;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
    input {
        font-size: 16px;
        border: 0;
        background-color: white;
        width: 80%;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
    }
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId: string;
    index: number;
}
interface IForm {
    toDo: string;
}

function Board({ toDos, boardId, index }: IBoardProps) {
    const [toDoList, setToDos] = useRecoilState(toDoState);
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
    const onDelete = (event: React.MouseEvent<SVGElement>) => {
        setToDos((allBoards) => {
            const boardCopy = { ...allBoards };
            delete boardCopy[boardId];
            return boardCopy;
        });
    };

    return (
        <Draggable index={index} key={boardId} draggableId={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef} {...magic.draggableProps}>
                    <div {...magic.dragHandleProps}>
                        <Title>{boardId}</Title>
                        <Icons>
                            <VscClose style={style} onClick={onDelete} />
                        </Icons>
                    </div>

                    <Form onSubmit={handleSubmit(onValid)}>
                        <input
                            {...register("toDo", { required: true })}
                            type="text"
                            placeholder={`내용을 입력해주세요`}
                        />
                    </Form>

                    <Droppable droppableId={boardId} direction="vertical">
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
            )}
        </Draggable>
    );
}

export default Board;
