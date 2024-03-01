import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleSubmitValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldTodos) => [
      { text: toDo, id: Date.now(), category: "TO_DO" },
      ...oldTodos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitValid)}>
      <input
        {...register("toDo", { required: "Write a to do" })}
        placeholder="Write a To Do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
