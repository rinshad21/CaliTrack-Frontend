import { AlertCircle, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PleaseLogin() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        
   
        <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-2xl">
          
         
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg">
              <AlertCircle className="w-8 h-8 text-slate-900" />
            </div>
          </div>

    
          <h1 className="text-3xl font-bold text-white text-center mb-3">
            Authentication Required
          </h1>

        
          <p className="text-slate-300 text-center mb-8 leading-relaxed">
            You need to log in to access this feature. Sign in with your account to continue tracking your fitness journey.
          </p>

     
          

          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-6 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center gap-2 group hover:-translate-y-1"
          >
            <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Go to Login
          </button>


          <p className="text-center text-slate-400 text-sm mt-4">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"
            >
              Sign up here
            </button>
          </p>
        </div>

        
        <div className="mt-6 text-center">
          <p className="text-slate-400 text-xs">
            Your fitness journey starts here. Log in to unlock all features.
          </p>
        </div>
      </div>
    </div>
  );
}