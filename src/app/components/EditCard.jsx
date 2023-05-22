"use client";
import { AiFillEdit } from "react-icons/ai";
export default function EditCard({ metric, point, color }) {
  return (
    <div className="border-[1px]  border-[rgba(255,255,255,0.3)] p-3">
      <h1 className="text-xl">
        <span className={`font-medium ${color} mr-2`}>{metric}:</span>
        {point} points
        <AiFillEdit className="inline transition-all cursor-pointer text-xl text-[rgba(255,255,255,0.3)] hover:text-white ml-2" />
      </h1>
    </div>
  );
}
