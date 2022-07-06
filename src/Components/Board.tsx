import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;
const Title = styled.h1`
    font-weight: bold;
    font-size: 20px;
`;
interface IAreaProps {
    isDraggingOver: boolean;
    isDraggingFromThis: boolean;
}
const Area = styled.div<IAreaProps>`
    background-color: ${(prop) =>
        prop.isDraggingOver
            ? "pink"
            : prop.isDraggingFromThis
            ? "red"
            : "blue"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps {
    toDos: string[];
    boardId: string;
}
function Board({ toDos, boardId }: IBoardProps) {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
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
                                key={toDo}
                                index={index}
                                toDo={toDo}
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
