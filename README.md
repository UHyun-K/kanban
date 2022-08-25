#React 칸반보드

##⚙️ 기술 및 개발 환경

React
TypeScript
Styled Components
Atom
Recoil
React-hook-form

##🎐구현 기능

-board

Create
Delete
Drag

-Cards

Create
Delete
Drag

-local storage

###문제와해결

1.icon 사라지고 없어지는 것 mouseOn eventHandler를 이용하여 씨름했으나
-->hover

2.styled component 기능
한 컴포넌트에서 다른 컴포넌트 참조할 때
const Card = styled.div`color:red; ${Board}{ background:red; } &:hover{ ${Name}{ opacity:1; } }`

3.보드삭제하기 구현 중
이전과 같은방식으로 [...d]
배열로 받아서 splice를 구현하려했는데
atom.을 살펴보면 객체의 키값이지 배열이 아니라는걸 늦게 알아챔 . setToDos((allBoards) => {
const BoardCopy = { ...allBoards };
delete BoardCopy[boardId];
return BoardCopy;
});

4.보드의 이동은 목록의 이동과 달리 객체여서 splice로 순서를 수정하지 못함.
Object.entries() 와 Object.fromEntries()를 사용.
// 객체 --> 배열 안에 배열로 키와값이 쌍으로 나옴 --> 객체
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

5.git reset으로 삭제한 commit을 복구하기위해 git reflog기능 사용
