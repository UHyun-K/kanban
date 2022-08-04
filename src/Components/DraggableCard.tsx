import React from "react";
import { VscEdit, VscClose } from "react-icons/vsc";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const IconWrap = styled.button`
    opacity: 0;
    transition: opacity 0.2s;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
`;
const Card = styled.div<{ isDragging: boolean }>`
    background-color: ${(props) =>
        props.isDragging ? "#74b9ff" : props.theme.cardColor};
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05) " : "none"};

    background: blue;
    display: flex;
    flex-grow: 1;
    &:hover {
        ${IconWrap} {
            opacity: 1;
        }
    }
`;
const Text = styled.span`
    font-weight: bold;
    display: block;
    flex-grow: 15;
`;

interface IDraggableCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
    boardId: string;
}

function DraggableCard({
    toDoId,
    toDoText,
    index,
    boardId,
}: IDraggableCardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const onDelete = (event: React.MouseEvent<SVGElement>) => {
        setToDos((allBoards) => {
            const sourceBoard = [...allBoards[boardId]];
            sourceBoard.splice(index, 1);
            return {
                ...allBoards,
                [boardId]: sourceBoard,
            };
        });
    };

    const onEdit = (event: React.MouseEvent<SVGElement>) => {};
    return (
        <Draggable draggableId={toDoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    <Text>{toDoText}</Text>
                    <IconWrap>
                        <VscEdit onClick={onEdit} />
                        <VscClose onClick={onDelete} />
                    </IconWrap>
                </Card>
            )}
        </Draggable>
    );
}
export default React.memo(DraggableCard);
