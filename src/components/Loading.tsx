import { Dumbbell } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900">
      <div className="relative flex justify-center items-center">
        {/* Spinner circle */}
        <div className="w-16 h-16 border-4 bg-linear-to-br from-amber-400 to-orange-500 border-t-book-violet-600 rounded-full animate-spin"></div>

        {/* Center icon */}
        <Dumbbell className="absolute  w-7 h-7 animate-pulse" />
      </div>

      {/* Text */}
      <p className="mt-4 bg-linear-to-br from-amber-400 to-orange-500 font-semibold text-lg tracking-wide">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
