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

interface IForm {
  email: string;
  firstName: string;
  lastName?: string;
  password1: string;
  password2: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.password1 !== data.password2) {
      return setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    setError("extraError", { message: "INTERNAL SERVER ERROR" });
  };
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            minLength: { value: 10, message: "over 10 letters is required" },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only @naver.com is allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Write here",
            validate: {
              noNico: async (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noYeop: (value) =>
                value.includes("yeop") ? "no yeop allowed" : true,
            },
            minLength: { value: 1, message: "Your name is too short" },
          })}
          placeholder="First Name"
        />
        <span>{errors.firstName?.message}</span>
        <input
          {...register("lastName", { minLength: 10 })}
          placeholder="Last Name"
        />
        <span>{errors.lastName?.message}</span>
        <input
          {...register("password1", {
            required: "password is required",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="Password"
        />
        <span>{errors.password1?.message}</span>
        <input
          {...register("password2", {
            required: "password is required",
            minLength: { value: 5, message: "Your password is too short" },
          })}
          placeholder="Password"
        />
        <span>{errors.password2?.message}</span>
        <button>Add</button>
        <span>{errors.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;
