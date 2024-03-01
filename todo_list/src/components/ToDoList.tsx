import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleSubmitValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setToDos((oldTodos) => [
      { text: data.toDo, id: Date.now(), category: "TO_DO" },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Do</h1>
      <hr />
      <form onSubmit={handleSubmit(handleSubmitValid)}>
        <input
          {...register("toDo", { required: "Write a to do" })}
          placeholder="Write a To Do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
