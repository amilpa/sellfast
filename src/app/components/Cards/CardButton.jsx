import Link from "next/link";

export default function CardButton({ title, content, children, href }) {
  return (
    <Link href={`${href}`}>
      <div className="w-[350px] h-[180px] flex flex-col px-5 pt-7 gap-1 cursor-pointer justify-start transition-all duration-200 border-[1px] border-[rgba(255,255,255,0.3)] hover:border-white rounded-md hover:shadow-lg hover:shadow-[rgba(255,255,255,0.1)]">
        {children}
        <h1 className="text-xl font-medium">{title}</h1>
        <p className="text-sm text-gray-400 pt-1">{content}</p>
      </div>
    </Link>
  );
}
