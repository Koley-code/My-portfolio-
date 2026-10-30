'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '../lib/siteConfig';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);



  useEffect(() => {
    const animationDuration = 2200;
    const updateInterval = 40;
    const startTime = performance.now();

    let hideTimer: number | undefined;

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startTime;

      const nextProgress = Math.min(
        100,
        Math.round((elapsed / animationDuration) * 100)
      );

      setProgress(nextProgress);

      if (nextProgress >= 100) {
        window.clearInterval(progressTimer);

        hideTimer = window.setTimeout(() => {
          setIsLoading(false);
        }, 700);
      }
    }, updateInterval);

    return () => {
      window.clearInterval(progressTimer);

      if (hideTimer !== undefined) {
        window.clearTimeout(hideTimer);
      }
    };
  }, []);



  if (!isLoading) return null;

  const codeLines = [
    'const portfolio = {',
    `  name: "${siteConfig.personal.name}",`,
    `  role: "${siteConfig.personal.title}",`,
    '  status: "loading...",',
    '};',
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-slate-50 px-6 transition-all duration-700 ${progress >= 100
          ? 'opacity-0 pointer-events-none'
          : 'opacity-100'
          }`}
      >
        {/* =====================================================
            LOGO
           ===================================================== */}
        <div className="mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-secondary shadow-xl shadow-accent/20">
              <span className="text-3xl font-bold text-white">
                {siteConfig.personal.name.charAt(0)}
              </span>
            </div>

            <div className="absolute -inset-2 rounded-3xl border border-accent/20 animate-pulse" />
            <div className="absolute -inset-4 rounded-[2rem] border border-accent-secondary/10" />
          </div>

          <h1 className="mt-5 text-center text-xl font-semibold tracking-tight text-ink">
            {siteConfig.personal.name}
          </h1>

          <p className="mt-1 text-center text-sm text-ink-muted">
            {siteConfig.personal.title}
          </p>
        </div>

        {/* =====================================================
            CODE EDITOR
           ===================================================== */}
        <div className="w-full max-w-[430px]">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#111827] shadow-2xl shadow-slate-400/20">
            {/* Editor top bar */}
            <div className="flex h-10 items-center border-b border-white/10 bg-[#1a2231] px-4">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              </div>

              <div className="ml-4 rounded-md bg-white/5 px-3 py-1 text-[10px] text-white/50">
                portfolio.ts
              </div>
            </div>

            {/* Editor body */}
            <div className="px-5 py-5 font-mono text-[12px] leading-6 sm:text-[13px]">
              {codeLines.map((line, index) => {
                const isLast = index === codeLines.length - 2;

                return (
                  <div key={index} className="flex">
                    <span className="mr-4 w-4 select-none text-right text-white/25">
                      {index + 1}
                    </span>

                    <span
                      className={
                        index === 0 || index === codeLines.length - 1
                          ? 'text-purple-300'
                          : 'text-white/80'
                      }
                    >
                      {line}
                    </span>

                    {isLast && (
                      <span className="ml-1 inline-block animate-pulse text-cyan-300">
                        _
                      </span>
                    )}
                  </div>
                );
              })}

              <div className="mt-3 flex items-center gap-2 text-[11px]">
                <span className="text-green-400">●</span>

                <span className="text-white/45">
                  {progress < 35
                    ? 'Initializing environment...'
                    : progress < 65
                      ? 'Loading components...'
                      : progress < 90
                        ? 'Preparing experience...'
                        : progress < 100
                          ? 'Almost ready...'
                          : 'Portfolio ready ✓'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            TOY CAR ROAD
           ===================================================== */}
        <div className="mt-10 w-full max-w-[520px]">
          <div className="relative h-[85px] overflow-hidden">
            {/* Road shadow */}
            <div className="absolute bottom-4 left-0 right-0 h-[8px] rounded-full bg-slate-300/50 blur-[2px]" />

            {/* Road */}
            <div className="absolute bottom-6 left-0 right-0 h-[5px] rounded-full bg-slate-300" />

            {/* Road marking */}
            <div className="absolute bottom-[26px] left-0 right-0 flex justify-between gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className="h-[2px] w-7 rounded-full bg-slate-400/70"
                />
              ))}
            </div>

            {/* Car */}
            <div
              className="toy-car absolute bottom-[18px] left-[-100px]"
              style={{
                left: `${progress}%`,
                transform: 'translateX(-50%)',
              }}
            >
              {/* Smoke */}
              <div className="absolute -left-8 bottom-5">
                <span className="smoke smoke-one" />
                <span className="smoke smoke-two" />
                <span className="smoke smoke-three" />
                <span className="smoke smoke-four" />
                <span className="smoke smoke-five" />
                <span className="smoke smoke-six" />
              </div>

              {/* Car body */}
              <div className="relative h-[28px] w-[62px] rounded-lg bg-gradient-to-r from-accent to-accent-secondary shadow-lg">
                {/* Cabin */}
                <div className="absolute left-[13px] top-[-14px] h-[18px] w-[36px] rounded-t-[10px] bg-gradient-to-r from-accent to-accent-secondary">
                  <div className="absolute left-[5px] top-[4px] h-[9px] w-[12px] rounded-[3px] bg-white/55" />
                  <div className="absolute right-[5px] top-[4px] h-[9px] w-[12px] rounded-[3px] bg-white/55" />
                </div>

                {/* Front light */}
                <span className="absolute right-1 top-2 h-2 w-2 rounded-full bg-yellow-200 shadow-[0_0_8px_rgba(253,224,71,0.9)]" />

                {/* Rear light */}
                <span className="absolute left-1 top-2 h-2 w-2 rounded-full bg-red-300" />

                {/* Wheels */}
                <span className="wheel absolute -bottom-2 left-2 h-5 w-5 rounded-full bg-slate-800">
                  <span className="absolute inset-[4px] rounded-full bg-slate-400" />
                </span>

                <span className="wheel absolute -bottom-2 right-2 h-5 w-5 rounded-full bg-slate-800">
                  <span className="absolute inset-[4px] rounded-full bg-slate-400" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            LOADING STATUS
           ===================================================== */}
        <div className="mt-5 flex items-center gap-3">
          <span className="font-mono text-xs tracking-wider text-ink-light">
            LOADING
          </span>

          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="w-8 text-right font-mono text-xs text-ink-muted">
            {progress}%
          </span>
        </div>
      </div>

      {/* =======================================================
          ANIMATIONS
         ======================================================= */}
      <style jsx>{`
        .toy-car {
         will-change: left;
         transition: left 45ms linear;
        }

        .wheel {
          animation: wheelSpin 0.45s linear infinite;
          transform-origin: center;
        }

        .smoke {
          position: absolute;
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(100, 116, 139, 0.55);
          filter: blur(2px);
          box-shadow: 0 0 10px rgba(100, 116, 139, 0.25);
          pointer-events: none;
        }

        .smoke-one {
          left: 0;
          bottom: 3px;
          animation: smokeOne 1.4s ease-out infinite;
        }

        .smoke-two {
          left: -3px;
          bottom: 2px;
          animation: smokeTwo 1.4s ease-out 0.3s infinite;
        }

        .smoke-three {
          left: -6px;
          bottom: 0;
          animation: smokeThree 1.4s ease-out 0.6s infinite;
        }

        .smoke-four {
          left: -4px;
          bottom: 5px;
          animation: smokeFour 1.5s ease-out 0.2s infinite;
        }

        .smoke-five {
          left: -8px;
          bottom: 3px;
          animation: smokeFive 1.5s ease-out 0.5s infinite;
        }

        .smoke-six {
          left: -10px;
          bottom: 0;
          animation: smokeSix 1.5s ease-out 0.8s infinite;
        }

        @keyframes smokeOne {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.4);
          }

          15% {
            opacity: 0.75;
          }

          100% {
           opacity: 0;
            transform: translate(-30px, -24px) scale(2.2);
          }
        }

        @keyframes smokeTwo {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.35);
          }

          15% {
            opacity: 0.65;
          }

          100% {
            opacity: 0;
            transform: translate(-38px, -32px) scale(2.5);
          }
        }

        @keyframes smokeThree {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3);
          }

          15% {
            opacity: 0.6;
          }

          100% {
            opacity: 0;
            transform: translate(-48px, -40px) scale(2.8);
          }
        }

        @keyframes smokeFour {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3);
          }

          15% {
            opacity: 0.55;
          }

          100% {
            opacity: 0;
            transform: translate(-22px, -35px) scale(2);
          }
        }

        @keyframes smokeFive {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3);
          }

          15% {
           opacity: 0.5;
          }

          100% {
            opacity: 0;
            transform: translate(-42px, -28px) scale(2.4);
          }
        }

        @keyframes smokeSix {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.25);
          }

          15% {
            opacity: 0.45;
          }

          100% {
            opacity: 0;
            transform: translate(-52px, -45px) scale(2.7);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .toy-car,
          .wheel,
          .smoke {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}