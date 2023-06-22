"use client";
export default function InputElement({ label }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type="text"
        name={label.toLowerCase()}
        htmlFor={label.toLowerCase()}
        className="bg-inherit outline-none text-base border-2 border-gray-700 focus:border-gray-600 rounded-sm py-1 pl-3"
      />
    </div>
  );
}
