import { Home, ArrowLeft } from "lucide-react";
import { ReturnHome } from "./return-home";

export const NotFound = () => {
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center px-4 flex-col"
      style={{ fontFamily: "Courier New, monospace" }}
    >
      <ReturnHome />
      <div className="max-w-3xl w-full">
        {/* Border */}
        <div className="bg-black border-4 border-black p-8">
          {/* Header bar */}
          <div className="bg-black text-white px-4 py-2 mb-6 text-center font-bold text-xl">
            ═══════════════════════════════════════════════════════
          </div>

          {/* ASCII Art 404 */}
          <pre className="text-white text-center mb-6 text-sm leading-tight overflow-x-auto">
            {`
 ╦ ╦  ╔═╗  ╦ ╦
 ║ ║  ║ ║  ║ ║
 ╚═╝  ╚═╝  ╚═╝
            
 ███╗   ██╗ ██████╗ ████████╗
 ████╗  ██║██╔═══██╗╚══██╔══╝
 ██╔██╗ ██║██║   ██║   ██║   
 ██║╚██╗██║██║   ██║   ██║   
 ██║ ╚████║╚██████╔╝   ██║   
 ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   
            
 ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
 ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
 █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║
 ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║
 ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
 ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ 
`}
          </pre>

          {/* Message */}
          <div className="bg-black text-white p-6 mb-6 text-center">
            <p className="text-lg font-bold mb-2">ERROR: PAGE NOT FOUND</p>
            <p className="text-sm">
              The requested resource does not exist in the system.
            </p>
            <p className="text-sm mt-2">
              Please check the path or return to a valid location.
            </p>
          </div>

          {/* Options menu */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              [B] GO BACK
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              className="w-full bg-black text-white px-6 py-3 font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              [H] RETURN TO HOME
            </button>
          </div>

          {/* Footer bar */}
          <div className="bg-black text-white px-4 py-2 text-center font-bold text-xl">
            ═══════════════════════════════════════════════════════
          </div>

          {/* Status bar */}
          <div className="mt-4 text-center text-black text-sm font-bold">
            STATUS: 404 | TIME: {new Date().toLocaleTimeString()} | SYSTEM
            ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};
