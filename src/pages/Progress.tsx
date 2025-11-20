import { useState } from "react";
import {
  useDeleteProgressMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
} from "@/redux/progressSlice";
import Loading from "@/components/Loading";
import { DeleteIcon } from "lucide-react";
interface progressForm {
  weight: string;
  bodyFat: string;
  waist: string;
  chest: string;
  date?: String;
  photoFile?: File | null;
}
export default function ProgressTracker() {
  const { data, isLoading, refetch, error } = useGetProgressQuery(undefined);
  const [updateProgress] = useUpdateProgressMutation();
  const [deleteProgress] = useDeleteProgressMutation();
  const [form, setForm] = useState<progressForm>({
    weight: "",
    bodyFat: "",
    waist: "",
    chest: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await updateProgress(form);
    setForm({ weight: "", bodyFat: "", waist: "", chest: ""});
  };
  const handleDelete = async (id: any) => {
    try {
      await deleteProgress(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error)
    return (
      <p className="text-2xl font-bold text-red">
        Failed to load Your Progress,login to continue
      </p>
    );
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Body Progress
          </h1>
          <p className="text-slate-400">
            Track your fitness journey week by week
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-xl sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Log Measurement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    placeholder="75.5"
                    value={form.weight}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Body Fat %
                  </label>
                  <input
                    type="number"
                    placeholder="18.5"
                    value={form.bodyFat}
                    onChange={(e) =>
                      setForm({ ...form, bodyFat: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="88"
                    value={form.waist}
                    onChange={(e) =>
                      setForm({ ...form, waist: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Chest (cm)
                  </label>
                  <input
                    type="number"
                    placeholder="105"
                    value={form.chest}
                    onChange={(e) =>
                      setForm({ ...form, chest: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 mt-6"
                >
                  Save Progress
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">History</h3>
            <div className="space-y-4">
              {data?.progress?.entries?.length ? (
                data.progress.entries.map((p: any, i: any) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-slate-500 transition-all hover:border-red-500/50"
                  >
                  <div className="flex justify-between items-center">
    {/* Display Area */}
    <p className="text-lg font-medium text-white">
      <span className="text-slate-400 font-light mr-3">Progress Date:</span> 
      <span className="text-green-600 font-bold tracking-wide">
        {p.date ? new Date(p.date).toLocaleDateString('en-GB') : 'N/A'}
      </span>
    </p>

    <button

      className="text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-transform duration-200 transform hover:scale-110 active:scale-95"
      onClick={() => handleDelete(p._id)}
      aria-label="Delete Progress Record"
    >
      
      <DeleteIcon size={25}/>
    </button>
  </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                          Weight
                        </p>
                        <p className="text-xl font-bold text-amber-400">
                          {p.weight}{" "}
                          <span className="text-xs text-slate-400">kg</span>
                        </p>
                      </div>
                      <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                          Body Fat
                        </p>
                        <p className="text-xl font-bold text-orange-400">
                          {p.bodyFat}{" "}
                          <span className="text-xs text-slate-400">%</span>
                        </p>
                      </div>
                      <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                          Waist
                        </p>
                        <p className="text-xl font-bold text-cyan-400">
                          {p.waist}{" "}
                          <span className="text-xs text-slate-400">cm</span>
                        </p>
                      </div>
                      <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                        <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                          Chest
                        </p>
                        <p className="text-xl font-bold text-blue-400">
                          {p.chest}{" "}
                          <span className="text-xs text-slate-400">cm</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-linear-to-br from-slate-700 to-slate-800 rounded-xl p-12 border border-slate-600 text-center">
                  <p className="text-slate-400">No progress recorded yet.</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Start by logging your first measurement!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
