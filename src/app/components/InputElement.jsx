"use client";
export default function InputElement({ error, label, onChange }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type="text"
        htmlFor={label.toLowerCase()}
        className="bg-inherit outline-none text-base border-2 border-gray-800 focus:border-gray-600 rounded-sm py-1 pl-3"
      />
    </div>
  );
}
