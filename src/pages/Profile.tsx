import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetProfileQuery, useUpdatelevelMutation } from "@/redux/progressSlice";
import workoutsapi from "@/redux/workouts";

const Profile = () => {
  const dispatch = useDispatch();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateLevel] = useUpdatelevelMutation();


  const localLevel = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}").level;
    } catch {
      return undefined;
    }
  })();

  const displayLevel = profile?.level ?? localLevel;
  const displayUsername = profile?.username ?? localStorage.getItem("username") ?? "";

  // Syncing DB level to localStorage
  useEffect(() => {
    if (profile?.level) {
      try {
        const prev = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem("user", JSON.stringify({ ...prev, level: profile.level }));
      } catch {
        localStorage.setItem("user", JSON.stringify({ level: profile.level }));
      }
      localStorage.setItem("level", profile.level);
    }
  }, [profile?.level]);

  const handleLevelChange = async (level: string) => {
    await updateLevel(level);
   
    try {
      const prev = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem("user", JSON.stringify({ ...prev, level }));
    } catch {
      localStorage.setItem("user", JSON.stringify({ level }));
    }
    localStorage.setItem("level", level);
  
    dispatch(workoutsapi.util.invalidateTags(["workouts"]));
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-linear-to-br from-[#0e9453]/5 to-transparent dark:from-[#0e9453]/10 dark:to-gray-900 rounded-2xl shadow-lg border border-[#0e9453]/20 dark:border-[#0e9453]/30 m-12">
      <div className="mb-8 pb-6 border-b border-[#0e9453]/20 dark:border-[#0e9453]/30">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-3">
          Username
        </p>
        <div className="bg-linear-to-r from-[#0e9453] to-[#0b6d3f] rounded-xl px-4 py-3 inline-block">
          <p className="text-white font-bold text-lg">{displayUsername}</p>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-3">
          Fitness Level
        </p>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#0e9453]"></div>
          <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">
            {isLoading ? "Loading..." : displayLevel}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => handleLevelChange("beginner")}
          className={`px-3 py-4 rounded-xl font-semibold transition-all duration-200 text-sm ${displayLevel === "beginner"
            ? "bg-[#0e9453] text-white shadow-lg shadow-[#0e9453]/30 scale-105"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
            }`}
        >
          Beginner
        </button>
        <button
          onClick={() => handleLevelChange("intermediate")}
          className={`px-1 py-1 rounded-xl font-semibold transition-all duration-200 text-sm ${displayLevel === "intermediate"
            ? "bg-[#0e9453] text-white shadow-lg shadow-[#0e9453]/30 scale-105"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
            }`}
        >
          Intermediate
        </button>
        <button
          onClick={() => handleLevelChange("advanced")}
          className={`px-3 py-4 rounded-xl font-semibold transition-all duration-200 text-sm ${displayLevel === "advanced"
            ? "bg-[#0e9453] text-white shadow-lg shadow-[#0e9453]/30 scale-105"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600"
            }`}
        >
          Advanced
        </button>
      </div>
    </div>
  );
};

export default Profile;
