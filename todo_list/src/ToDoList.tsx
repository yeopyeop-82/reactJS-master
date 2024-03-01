import { useState } from "react";
import { useForm } from "react-hook-form";

/* function ToDoList() {
  const [todo, setTodo] = useState("");
  const [toDoError, setToDoError] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDoError("");
    setTodo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todo.length < 10) {
      return setToDoError("To do should be longer than 10 letters");
    }
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={todo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
} */

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  console.log(formState.errors);
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", { required: true, minLength: 10 })}
          placeholder="Email"
        />
        <input
          {...register("firstName", {
            required: true,
            minLength: { value: 5, message: "Your name is too short" },
          })}
          placeholder="First Name"
        />
        <input
          {...register("lastName", { required: true, minLength: 10 })}
          placeholder="Last Name"
        />
        <input
          {...register("password", {
            required: "password is required",
            minLength: 5,
          })}
          placeholder="Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
