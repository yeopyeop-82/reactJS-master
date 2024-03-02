import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;

    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // 1) delete item on source.index
      console.log("Delete item on ", source.index);
      console.log(copyToDos);
      copyToDos.splice(source.index, 1);
      console.log("Delete item ");
      // 2) Put back the item on the destiantion.index
      console.log("put back ", draggableId, "on ", destination.index);
      copyToDos.splice(destination?.index, 0, draggableId);
      console.log(copyToDos);
      return copyToDos;
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <Draggable key={toDo} draggableId={toDo} index={index}>
                    {(magic) => (
                      <Card
                        ref={magic.innerRef}
                        {...magic.dragHandleProps}
                        {...magic.draggableProps}
                      >
                        {toDo}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
