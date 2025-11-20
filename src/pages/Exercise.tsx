import { useState, useEffect } from "react";
import { useFetchAllWorkoutsQuery } from "@/redux/workouts";
import { ChevronRight, Zap, TrendingUp } from "lucide-react";
import Loading from "@/components/Loading";
import Stopwatch from "@/components/Stopwatch";
interface workouts {
  _id: string;
  day: {
    day: number;
    set: number;
    reps: number;
    exercises: string[][];
  };
  level: string;
}

const Exercise = () => {
  const [level, setLevel] = useState(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : {};
    return user.level || "beginner";
  });
  const { data: workouts = [], isLoading, error } = useFetchAllWorkoutsQuery();
  const [day, setDay] = useState<number>(() => {
    const saved = localStorage.getItem("currentDay");
    return saved ? Number(saved) : 1;
  });
  useEffect(() => {
    const handler = () => {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse("user") : {};
      return user.level || "beginner";
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);
  const transformedWorkouts = workouts.map((w: any) => ({
    _id: w._id,
    day: w.day.day,
    exercises: w.day.excersie.flat(),
    set: w.day.set,
    reps: w.day.reps,
    level: w.level,
  }));

  const filteredWorkouts = transformedWorkouts.filter((w) => w.level === level);
  const currentWorkout = filteredWorkouts.find((w) => w.day === day);

  useEffect(() => {
    localStorage.setItem("currentDay", day.toString());
  }, [day]);

  if (isLoading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error)
    return (
      <p className="text-2xl font-bold text-red">
        Failed to load workouts,Login again
      </p>
    );

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-400" />
          <h1 className="text-4xl font-bold text-white">
            {level.toUpperCase()}
          </h1>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setDay(i + 1)}
              className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm ${
                i + 1 === day
                  ? "bg-linear-to-br from-amber-400 to-orange-500 text-slate-900"
                  : "bg-slate-700 text-slate-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="bg-slate-700 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <TrendingUp className="w-7 h-7 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Day {day}</h2>
          </div>
          <Stopwatch />
          <div className="grid grid-cols-2 gap-4 mt-4 mb-2">
            <div className="bg-linear-to-br from-amber-400/20 to-orange-500/20 rounded-lg p-4 border border-amber-400/30">
              <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Sets
              </p>
              <p className="text-2xl font-bold text-white">
                {currentWorkout?.set}
              </p>
            </div>
            <div className="bg-linear-to-br from-cyan-400/20 to-blue-500/20 rounded-lg p-4 border border-cyan-400/30">
              <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wide mb-1">
                Reps
              </p>
              <p className="text-2xl font-bold text-white">
                {currentWorkout?.reps}
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {currentWorkout?.exercises.map((ex: any, idx: any) => (
              <li
                key={idx}
                className="p-3 bg-slate-600 rounded-lg text-white font-medium"
              >
                {ex}
              </li>
            )) || <p className="text-white font-semibold text-xl">Rest day</p>}
          </ul>

          <button
            onClick={() => setDay(day >= 7 ? 1 : day + 1)}
            className="mt-6 w-full py-3 bg-linear-to-br from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg flex justify-center items-center gap-2"
          >
            Next Day <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
