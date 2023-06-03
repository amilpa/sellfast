"use client";
export default function InputElement({ label, onChange }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        type="text"
        name={label.toLowerCase()}
        htmlFor={label.toLowerCase()}
        className="bg-inherit outline-none text-base border-2 border-gray-800 focus:border-gray-600 rounded-sm py-1 pl-3"
        onChange={onChange}
      />
    </div>
  );
}
