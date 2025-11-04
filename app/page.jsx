"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function HeroSection() {
  const router = useRouter();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const parallaxX = (mousePos.x - window.innerWidth / 2) * 0.02;
  const parallaxY = (mousePos.y - window.innerHeight / 2) * 0.02;
  const handleCreateAccount = () => {
    router.push("/signup");
  };
  const handleLoginAccount = () => {
    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden font-mono">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
        }}
      ></div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Floating elements that follow mouse */}
      <div
        className="absolute w-96 h-96 rounded-full border border-indigo-500/20 top-1/4 left-1/4"
        style={{
          transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px)`,
          transition: "transform 0.3s ease-out",
        }}
      ></div>
      <div
        className="absolute w-64 h-64 rounded-full border border-purple-500/20 bottom-1/4 right-1/3"
        style={{
          transform: `translate(${-parallaxX * 3}px, ${-parallaxY * 3}px)`,
          transition: "transform 0.3s ease-out",
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-20 px-8 py-8 flex items-start justify-between">
        <div className="flex flex-col">
          <span className="text-4xl font-black text-white tracking-tighter">
            studback
          </span>
          <span className="text-xs text-indigo-400 tracking-widest mt-1">
            v0.0.1
          </span>
        </div>

        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleLoginAccount}
            className="px-6 py-2 bg-transparent border-2 border-indigo-500 text-indigo-400 font-bold tracking-wider hover:bg-indigo-500 hover:text-black transition-all duration-200 relative group overflow-hidden"
          >
            <span className="relative z-10">LOGIN_STUD</span>
            <div className="absolute inset-0 bg-indigo-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
          </button>
          <span className="text-xs text-zinc-600">
            {time.toLocaleTimeString()}
          </span>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-500 text-sm tracking-widest">
                SYSTEM_ONLINE
              </span>
            </div>

            <h1 className="text-7xl font-black text-white mb-4 leading-none">
              SPEAK
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400">
                WITHOUT
              </span>
              <br />
              FEAR
            </h1>

            <div className="w-20 h-1 bg-indigo-500 mb-8"></div>

            <p className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-lg">
              Raw feedback. Zero filters. Your voice matters in shaping better
              education. Anonymous submission platform for RIMT university
              ensures complete protection while maximizing impact.
            </p>

            <div className="flex gap-4 mb-12">
              <button
                onClick={handleCreateAccount}
                className="px-8 py-4 bg-indigo-600 text-white font-bold tracking-wider hover:bg-indigo-500 transition-all duration-200 relative group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  CREATE_ACCOUNT
                  <span className="text-xl">→</span>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 border-t border-zinc-800 pt-8">
              <div>
                <div className="text-3xl font-black text-white mb-1">200+</div>
                <div className="text-xs text-zinc-500 tracking-wider">
                  SUBMISSIONS
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white mb-1">100%</div>
                <div className="text-xs text-zinc-500 tracking-wider">
                  ANONYMOUS
                </div>
              </div>
              <div>
                {/* <div className="text-3xl font-black text-white mb-1">247</div>
                <div className="text-xs text-zinc-500 tracking-wider">
                  INSTITUTIONS
                </div>               */}
              </div>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="relative">
            <div className="border-4 border-zinc-800 bg-zinc-900 p-8 relative">
              {/* Terminal-like interface */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs text-zinc-600">
                  feedback_terminal
                </span>
              </div>

              <div className="space-y-3 text-sm font-mono">
                <div className="text-indigo-400">
                  <span className="text-green-500">user@studback</span>
                  <span className="text-zinc-600">:~$</span> initiate_feedback
                </div>
                <div className="text-zinc-500 pl-4">
                  → Loading secure channel...
                </div>
                <div className="text-zinc-500 pl-4">
                  → Anonymity protocol:{" "}
                  <span className="text-green-400">ACTIVE</span>
                </div>
                <div className="text-zinc-500 pl-4">
                  → Encryption: <span className="text-green-400">256-BIT</span>
                </div>
                <div className="text-zinc-500 pl-4 mb-6">
                  → Ready for input...
                </div>

                <div className="bg-zinc-950 p-4 border border-zinc-700">
                  <div className="text-zinc-600 text-xs mb-2">
                    [FEEDBACK_INPUT]
                  </div>
                  <div className="text-white">
                    Teaching methods were engaging
                    <span className="animate-pulse">_</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-grey-800 text-white font-bold tracking-wider transition-colors mt-4">
                  [TRANSMIT_OPENLY]
                </button>
              </div>

              {/* Decorative corner brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-indigo-500 -translate-x-2 -translate-y-2"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-indigo-500 translate-x-2 -translate-y-2"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-indigo-500 -translate-x-2 translate-y-2"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-indigo-500 translate-x-2 translate-y-2"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-0 right-0 z-20">
        <div className="text-center">
          <div className="inline-block border border-zinc-800 px-6 py-2 bg-zinc-950">
            <span className="text-xs text-zinc-600 tracking-widest">
              A Gurwinder Singh&apos;s productions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
