import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAuth } from "./../../context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc, deleteField } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import useFetchTodo from "./../../hooks/fetchTodos";
import TodoCard from "./TodoCard";

export default function Dashboard() {
  const { userInfo, currentUser } = useAuth();
  const [addTodo, setAddTodo] = useState(false);
  const [todo, setTodo] = useState("");
  const [edittedValue, setEdittedValue] = useState("");
  const [edit, setEdit] = useState(null);

  const { todos, setTodos, loading, error } = useFetchTodo();

  console.log(todos);

  /* useEffect(() => {
    if (userInfo && Object.keys(userInfo).length === 0) {
      setAddTodo(true);
    }
  }, [userInfo]);*/

  async function handleTodo() {
    if (!todo) {
      return;
    }
    const newKey =
      todos && Object.keys(todos).length > 0
        ? Math.max(...Object.keys(todos)) + 1
        : 1;
    setTodos({
      ...todos,
      [newKey]: todo,
    });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: todo,
        },
      },
      { merge: true }
    );
    setTodo("");
  }

  function handleEdit(todoKey) {
    return () => {
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }

  async function handleEditTodo() {
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        todos: {
          [newKey]: edittedValue,
        },
      },
      { merge: true }
    );
    setEdit(false);
    setEdittedValue("");
  }

  function handleDelete(todoKey) {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          todos: {
            [todoKey]: deleteField(),
          },
        },
        { merge: true }
      );
    };
  }
  return (
    <div className="max-w-[1500px] min-h-[88vh] mx-auto">
      <Modal />
      <div className="flex flex-col items-center justify-center max-w-[400px] mx-auto">
        {addTodo && (
          <div className="flex items-stretch w-full">
            <input
              type="text"
              placeholder="Enter List"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              className="flex-1 w-full p-2 font-medium text-black outline-none"
            />
            <button
              onClick={handleTodo}
              className="p-2 uppercase transition duration-300 bg-yellow-500 w-fit hover:opacity-30"
            >
              Add
            </button>
          </div>
        )}
        <button
          onClick={() => setAddTodo(!addTodo)}
          className="w-full p-2 mt-2 font-semibold border-2 rounded-xs"
        >
          ADD TODO
        </button>
        <div className="w-full mt-2">
          {loading && (
            <div className="flex items-center justify-center mt-5 text-2xl text-center">
              <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
          )}
          {!loading && (
            <>
              {Object.keys(todos).map((todo, i) => {
                return (
                  <TodoCard
                    handleEditTodo={handleEditTodo}
                    key={i}
                    handleAddEdit={handleEdit}
                    edit={edit}
                    todoKey={todo}
                    edittedValue={edittedValue}
                    setEdittedValue={setEdittedValue}
                    handleDelete={handleDelete}
                  >
                    {todos[todo]}
                  </TodoCard>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
