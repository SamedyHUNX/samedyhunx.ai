import { useEffect, useState } from "react";
import { ReturnHome } from "./return-home";

export const Loading = () => {
  const [dots, setDots] = useState("");
  const [spinnerFrame, setSpinnerFrame] = useState(0);

  const spinnerFrames = ["|", "/", "─", "\\"];

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const spinnerInterval = setInterval(() => {
      setSpinnerFrame((prev) => (prev + 1) % 4);
    }, 150);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(spinnerInterval);
    };
  }, []);

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
          <div className="bg-white text-black px-4 py-2 mb-6 text-center font-bold text-xl">
            ═══════════════════════════════════════════════════════
          </div>

          {/* ASCII Art Loading */}
          <pre className="text-white text-center mb-6 text-sm leading-tight overflow-x-auto">
            {`
 ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
 ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
 ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
 ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
 ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
 ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
`}
          </pre>

          {/* Loading message */}
          <div className="bg-white text-black p-6 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">
                {spinnerFrames[spinnerFrame]} LOADING{" "}
                {spinnerFrames[spinnerFrame]}
              </p>
              <p className="text-lg mb-2">PLEASE WAIT{dots}</p>
              <p className="text-sm mt-4">Processing system data...</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="bg-black border-2 border-white p-2">
              <div className="flex items-center gap-1">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-4 w-2 transition-colors duration-300 ${
                      (i + spinnerFrame * 3) % 8 < 4 ? "bg-white" : "bg-black"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* System messages */}
          <div className="bg-black border-2 border-white p-4 mb-6 text-white text-sm font-bold space-y-1">
            <p>&gt; INITIALIZING SYSTEM...</p>
            <p>&gt; LOADING RESOURCES...</p>
            <p>&gt; ESTABLISHING CONNECTION...</p>
            <p className="animate-pulse">
              &gt; PROCESSING_{spinnerFrames[spinnerFrame]}
            </p>
          </div>

          {/* Footer bar */}
          <div className="bg-white text-black px-4 py-2 text-center font-bold text-xl">
            ═══════════════════════════════════════════════════════
          </div>

          {/* Status bar */}
          <div className="mt-4 text-center text-white text-sm font-bold">
            STATUS: LOADING | TIME: {new Date().toLocaleTimeString()} | SYSTEM
            ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
};
