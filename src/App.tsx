import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

import Board from "./Components/Board";
import NewBoard from "./Components/NewBoard";

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
`;

function App() {
    const [toDos, setToDos] = useRecoilState(toDoState);
    const onDragEnd = (info: DropResult) => {
        console.log(info);
        const { draggableId, destination, source } = info;
        if (!destination) return;

        if (info.type === "board") {
            // board movement
            setToDos((allBoard) => {
                const copiedBoard = Object.entries({ ...allBoard });
                const cutTodo = [...copiedBoard.splice(source.index, 1)];
                copiedBoard.splice(destination.index, 0, ...cutTodo);
                return {
                    ...Object.fromEntries(copiedBoard),
                };
            });
        }

        if (destination?.droppableId === source.droppableId) {
            // same board movement.
            setToDos((allBoards) => {
                const boardCopy = [...allBoards[source.droppableId]];
                const taskObj = boardCopy[source.index];
                boardCopy.splice(source.index, 1);
                boardCopy.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: boardCopy,
                };
            });
        }
        if (destination?.droppableId !== source.droppableId) {
            // cross board movement
            setToDos((allBoards) => {
                const sourceBoard = [...allBoards[source.droppableId]]; //"todo"
                const taskObj = sourceBoard[source.index]; // {text:"hello" id:"1"}
                const destinationBoard = [
                    ...allBoards[destination.droppableId],
                ]; //"done"

                sourceBoard.splice(source.index, 1); //"toDo"에 {text:"hello" id:"1"} 삭제
                destinationBoard.splice(destination?.index, 0, taskObj); // ""done"에 {text:"hello" id:"1"}추가
                return {
                    ...allBoards,
                    [source.droppableId]: sourceBoard,
                    [destination.droppableId]: destinationBoard,
                };
            });
        }
    };

    return (
        <>
            <NewBoard />
            <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                    <Droppable
                        droppableId="BoardMovment"
                        direction="horizontal"
                        type="board"
                    >
                        {(magic) => (
                            <Boards
                                {...magic.droppableProps}
                                ref={magic.innerRef}
                            >
                                {Object.keys(toDos).map((boardId, index) => (
                                    <Board
                                        boardId={boardId}
                                        key={boardId}
                                        toDos={toDos[boardId]}
                                        index={index}
                                    />
                                ))}
                                {magic.placeholder}
                            </Boards>
                        )}
                    </Droppable>
                </Wrapper>
            </DragDropContext>
        </>
    );
}

export default App;
