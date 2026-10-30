'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

export const JOURNEY_ROAD_PATH = `
  M -70 95
  L 185 95

  C 275 95 315 135 315 205
  C 315 275 275 315 190 315
  C 105 315 65 355 65 410
  C 65 475 120 515 205 515

  C 290 515 325 480 325 425
  C 325 355 375 315 445 315
  C 515 315 555 355 555 425
  C 555 495 510 535 425 535

  C 345 535 305 575 305 640
  C 305 700 355 735 430 735

  C 505 735 545 700 545 635
  C 545 565 600 525 680 525

  C 760 525 805 570 805 650
  L 805 860
`;

export const MOBILE_JOURNEY_ROAD_PATH = `
  M 0 210

  C 120 210 210 90 380 90
  C 550 90 690 210 820 210

  C 910 210 1000 150 1000 300

  C 1000 455 850 520 690 520
  C 500 520 330 430 190 500

  C 70 560 120 700 300 720
  C 520 745 820 720 1120 720
`;

const TUNNEL_LENGTH = 150;

export default function JourneyRoad() {
  const pathRef =
    useRef<SVGPathElement>(null);

  const carRef =
    useRef<SVGGElement>(null);

  const [isMobile, setIsMobile] =
    useState(false);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(
        '(max-width: 700px)'
      );

    const updateMobileState = () => {
      setIsMobile(
        mediaQuery.matches
      );
    };

    updateMobileState();

    mediaQuery.addEventListener(
      'change',
      updateMobileState
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        updateMobileState
      );
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;

    if (!path || !car) return;

    const totalLength =
      path.getTotalLength();

    const speed =
      isMobile ? 120 : 220;

    let distance = 0;
    let lastTime = performance.now();
    let lastRender = 0;
    let frameId = 0;

    const frameInterval = 1000 / 30;


    /*
     * How far the car continues after
     * reaching the visible road endpoint.
     */
    const tunnelLength = 150;

    const animate = (time: number) => {

      if (time - lastRender < frameInterval) {
        frameId =
          requestAnimationFrame(
            animate
          );
        return;
      }

      lastRender = time;

      const delta =
        Math.min(
          (time - lastTime) / 1000,
          0.05
        );

      lastTime = time;

      distance += speed * delta;

      /*
       * Restart only after the car has travelled
       * completely through the tunnel.
       */
      if (
        distance >=
        totalLength + tunnelLength
      ) {
        distance = 0;
      }

      let currentPoint: DOMPoint;
      let nextPoint: DOMPoint;

      if (distance <= totalLength) {
        /*
         * CAR IS ON THE ROAD
         */
        currentPoint =
          path.getPointAtLength(
            distance
          );

        nextPoint =
          path.getPointAtLength(
            Math.min(
              distance + 2,
              totalLength
            )
          );

        /*
         * Car is visible while on the road.
         */
        car.style.opacity = '1';
        car.style.visibility = 'visible';
      } else {
        /*
         * CAR IS INSIDE THE TUNNEL
         */

        const tunnelDistance =
          distance - totalLength;

        const endPoint =
          path.getPointAtLength(
            totalLength
          );

        const beforeEndPoint =
          path.getPointAtLength(
            Math.max(
              0,
              totalLength - 2
            )
          );

        const dx =
          endPoint.x -
          beforeEndPoint.x;

        const dy =
          endPoint.y -
          beforeEndPoint.y;

        const length =
          Math.hypot(dx, dy);

        const directionX =
          dx / length;

        const directionY =
          dy / length;

        currentPoint =
          new DOMPoint(
            endPoint.x +
            directionX *
            tunnelDistance,

            endPoint.y +
            directionY *
            tunnelDistance
          );

        nextPoint =
          new DOMPoint(
            currentPoint.x +
            directionX * 2,

            currentPoint.y +
            directionY * 2
          );

        /*
         * Fade/hide the car only after it has
         * gone sufficiently deep inside the tunnel.
         */
        const fadeStart =
          tunnelLength * 0.25;

        if (
          tunnelDistance >=
          fadeStart
        ) {
          car.style.opacity = '0';
          car.style.visibility = 'hidden';
        } else {
          car.style.opacity = '1';
          car.style.visibility = 'visible';
        }
      }

      const angle =
        Math.atan2(
          nextPoint.y -
          currentPoint.y,
          nextPoint.x -
          currentPoint.x
        ) *
        (180 / Math.PI);

      car.setAttribute(
        'transform',
        `
      translate(
        ${currentPoint.x}
        ${currentPoint.y}
      )
      rotate(${angle})
    `
      );

      frameId =
        requestAnimationFrame(
          animate
        );
    };

    frameId =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        frameId
      );
    };
  }, [isMobile]);

  const roadPath =
    isMobile
      ? MOBILE_JOURNEY_ROAD_PATH
      : JOURNEY_ROAD_PATH;

  return (
    <div
      className="journey-road-wrap"
      aria-hidden="true"
    >
      <svg
        viewBox={
          isMobile
            ? '0 0 1000 800'
            : '0 0 800 800'
        }
        preserveAspectRatio="none"
        className="journey-road-svg"
      >
        <defs>

          {/* ==========================
              ROAD SHADOW
             ========================== */}

          <filter
            id="journeyRoadShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="150%"
          >
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation="10"
            />

            <feOffset
              dx="0"
              dy="12"
              result="offsetblur"
            />

            <feColorMatrix
              in="offsetblur"
              type="matrix"
              values="
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0 0
                0 0 0 0.28 0
              "
            />

            <feBlend
              in="SourceGraphic"
              mode="normal"
            />
          </filter>

          {/* ==========================
              ROAD SURFACE
             ========================== */}

          <linearGradient
            id="journeyRoadSurface"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#66686b"
            />

            <stop
              offset="45%"
              stopColor="#55575a"
            />

            <stop
              offset="100%"
              stopColor="#45474a"
            />
          </linearGradient>

          {/* ==========================
              ROAD EDGE
             ========================== */}

          <linearGradient
            id="journeyRoadEdge"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#f8f8f8"
            />

            <stop
              offset="50%"
              stopColor="#d9dadd"
            />

            <stop
              offset="100%"
              stopColor="#babdc1"
            />
          </linearGradient>
        </defs>

        {/* ==========================
            ROAD SHADOW
           ========================== */}

        <path
          ref={pathRef}
          d={roadPath}
          className="journey-road-shadow"
          fill="none"
          stroke="#323437"
          strokeWidth="108"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.28"
          filter="url(#journeyRoadShadow)"
        />

        {/* ==========================
            ROAD OUTER EDGE
           ========================== */}

        <path
          d={roadPath}
          fill="none"
          stroke="url(#journeyRoadEdge)"
          className="journey-road-edge"
          strokeWidth="108"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ==========================
            ROAD
           ========================== */}

        <path
          d={roadPath}
          fill="none"
          stroke="url(#journeyRoadSurface)"
          strokeWidth="100"
          className="journey-road-surface"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ==========================
            ROAD INNER HIGHLIGHT
           ========================== */}

        <path
          d={roadPath}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          className="journey-road-highlight"
          strokeWidth="94"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ==========================
            ROAD CENTER DASHES
           ========================== */}

        <path
          d={roadPath}
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeDasharray="22 18"
          opacity="0.92"
        />

        {/* =================================================
            MOVING TOY SUPERCAR
           ================================================= */}

        <g
          ref={carRef}
          className="journey-car-group"
        >
          <foreignObject
            x="-95"
            y="-85"
            width="190"
            height="170"
          >
            <div
              className="journey-car-shell"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) scale(${isMobile ? 0.62 : 1})`,
              }}
            >

              {/* ==========================
                  SMOKE
                 ========================== */}

              <div className="journey-car-smoke">
                <span className="journey-smoke journey-smoke-one" />
                <span className="journey-smoke journey-smoke-two" />
                <span className="journey-smoke journey-smoke-three" />
                <span className="journey-smoke journey-smoke-four" />
                <span className="journey-smoke journey-smoke-five" />
                <span className="journey-smoke journey-smoke-six" />
              </div>

              <div className="journey-toy-car-body">

                {/* =========================================
      FRONT LIGHT BEAM
     ========================================= */}

                <span className="journey-front-beam" />

                {/* =========================================
      FRONT LIGHT
     ========================================= */}

                <span className="journey-front-light journey-front-light-top" />
                <span className="journey-front-light journey-front-light-bottom" />

                {/* =========================================
      TOP-DOWN WINDSHIELD
     ========================================= */}

                <div className="journey-car-windshield">
                  <span />
                  <span />
                </div>

                {/* =========================================
      CENTER BODY
     ========================================= */}

                <div className="journey-car-roof">
                  <div className="journey-car-roof-glass" />
                </div>

                {/* =========================================
      REAR LIGHT
     ========================================= */}

                <span className="journey-rear-light journey-rear-light-top" />
                <span className="journey-rear-light journey-rear-light-bottom" />

                {/* =========================================
      REAR LIGHT BEAM
     ========================================= */}

                <span className="journey-rear-beam" />

              </div>
            </div>
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}