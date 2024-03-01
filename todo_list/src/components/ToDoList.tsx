import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDoState } from "../atoms";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);

  console.log(toDos);
  return (
    <div>
      <h1>To Do</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} /> // toDo의 것들을 가지고 온다.
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
