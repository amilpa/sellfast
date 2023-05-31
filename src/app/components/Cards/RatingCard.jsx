import { AiFillStar, AiOutlineArrowRight } from "react-icons/ai";

export default function RatingCard({ point }) {
  let showPoint = point ? point : 0;
  return (
    <div className="w-[350px] h-[150px] relative pt-6 transition-all flex flex-col md:gap-4 border-[1px] rounded-md border-gray-500 pl-5">
      <h1 className="text-lg text-yellow-600 flex items-center gap-1">
        <AiFillStar />
        <span className="text-white font-medium mr-2">Rating</span>
      </h1>
      <h1 className="text-3xl">{showPoint} points</h1>
      <AiOutlineArrowRight className="absolute right-6 top-7 text-xl" />
    </div>
  );
}
