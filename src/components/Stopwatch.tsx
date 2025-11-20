import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

function Stopwatch() {
  const [isrunning, setIsrunning] = useState(false);
  const [elapsedtime, setElapsedtime] = useState<number>(0); //holds total timee
  const intervalIdRef = useRef<any>(null);
  const startTimeref = useRef(0);
  useEffect(() => {
    if (isrunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedtime(Date.now() - startTimeref.current);
      }, 10);
      return () => {
        clearInterval(intervalIdRef.current);
      };
    }
  }, [isrunning]);

  function start(): void {
    setIsrunning(true);
    startTimeref.current = Date.now() - elapsedtime;
  }
  function stop(): void {
    setIsrunning(false);
  }
  function reset(): void {
    setElapsedtime(0);
    setIsrunning(false);
  }

  function formatTime(): String {
    let minutes = Math.floor((elapsedtime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedtime / 1000) % 60);
    let milliseconds = Math.floor((elapsedtime % 1000) / 10); //to display 2 digitts

    const minutesStr = String(minutes).padStart(2, "0");
    const secondsStr = String(seconds).padStart(2, "0");
    const millisecondsStr = String(milliseconds).padStart(2, "0");

    return `${minutesStr}:${secondsStr}:${millisecondsStr}`;
  }
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Workout Timer
        </h1>

        <div className="bg-slate-600/50 rounded-2xl p-8 mb-8 border border-slate-500">
          <div className="text-6xl font-mono font-bold text-center text-amber-400">
            {formatTime()}
          </div>
          <p className="text-center text-slate-400 text-sm mt-2">mm:ss:ms</p>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          {!isrunning ? (
            <button
              onClick={start}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <Play className="w-5 h-5" />
              Start
            </button>
          ) : (
            <button
              onClick={stop}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-400 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              <Pause className="w-5 h-5" />
              Stop
            </button>
          )}

          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-slate-500/50 transition-all duration-300 hover:-translate-y-1 border border-slate-500"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>
        </div>

        {/* Status */}
        <div className="text-center">
          <p className="text-slate-400 text-sm">
            {isrunning ? (
              <span className="text-green-400 font-semibold">
                ⏱️ Running...
              </span>
            ) : elapsedtime > 0 ? (
              <span className="text-amber-400 font-semibold">⏸️ Paused</span>
            ) : (
              <span className="text-slate-400">Ready to start</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Stopwatch;
