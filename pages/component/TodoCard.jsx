import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";

export default function TodoCard(props) {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;

  return (
    <div className="relative flex items-stretch p-2 border border-white border-solid v sm:p-3 ">
      <div className="flex flex-1 font-semibold">
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            className="flex-1 text-white outline-none bg-inherit"
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
        {/* {children} */}
      </div>
      <div className="flex items-center">
        {edit === todoKey ? (
          <span
            onClick={handleEditTodo}
            className="px-2 text-red-500 duration-300 cursor-pointer fa-solid fa-check hover:scale-125"
          >
            <BsCheckLg />
          </span>
        ) : (
          <span
            onClick={handleAddEdit(todoKey)}
            className="px-2 duration-300 cursor-pointer fa-solid fa-pencil hover:rotate-45"
          >
            <BsFillPencilFill />
          </span>
        )}
        <span
          onClick={handleDelete(todoKey)}
          className="px-2 text-red-500 duration-300 cursor-pointer fa-solid fa-trash-can hover:scale-125"
        >
          <BsTrashFill />
        </span>
      </div>
    </div>
  );
}
