"use client";
import { useRef, useState } from "react";
import { AiFillEdit, AiOutlineDollar } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export default function EditCard({ userId, point }) {
  const [isEditing, setIsEditing] = useState(false);
  let pointInitial = 0;
  if (point) {
    pointInitial = point;
  }
  const [input, setInput] = useState(pointInitial);
  const [correct, setCorrect] = useState(true);

  const inputRef = useRef();

  function handleEditOption() {
    setIsEditing(!isEditing);
  }

  async function handleEditSubmit() {
    let isNum = /^\d+$/.test(input);
    if (!isNum) {
      setCorrect(false);
      return null;
    } else {
      setCorrect(true);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/budget/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance: input, userId }),
      }
    );
    setIsEditing(!isEditing);
  }

  return (
    <div className="w-[350px] h-[150px] relative pt-6 transition-all flex flex-col md:gap-4 border-[1px] rounded-md border-gray-500 pl-5">
      <h1 className="text-lg text-blue-600 flex items-center gap-1">
        <AiOutlineDollar />
        <span className="text-white font-medium mr-2">Balance</span>
      </h1>
      {isEditing ? (
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputRef}
            maxLength={8}
            className="w-[150px] bg-inherit text-3xl rounded-md outline-none focus:border-[1px] focus:border-gray-500"
            autoFocus
          />
          <BsCheckLg
            className="text-3xl ml-1 cursor-pointer"
            onClick={() => handleEditSubmit()}
          />
        </div>
      ) : (
        <span className="text-3xl">{input} points</span>
      )}
      {isEditing ? (
        ""
      ) : (
        <AiFillEdit
          className="absolute right-6 top-7 text-xl cursor-pointer"
          onClick={() => handleEditOption()}
        />
      )}
      {correct ? (
        ""
      ) : (
        <span className="absolute text-sm bottom-4 text-red-200">
          Please enter valid integers
        </span>
      )}
    </div>
  );
}
