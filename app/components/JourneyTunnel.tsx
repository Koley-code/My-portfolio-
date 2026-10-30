'use client';

export default function JourneyTunnel() {
  return (
    <div
      className="journey-tunnel"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 360"
        className="journey-tunnel-svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Main metallic wall */}
          <linearGradient
            id="tunnelWallGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#686d73"
            />

            <stop
              offset="18%"
              stopColor="#8d9298"
            />

            <stop
              offset="50%"
              stopColor="#dfe1e4"
            />

            <stop
              offset="72%"
              stopColor="#969ba1"
            />

            <stop
              offset="100%"
              stopColor="#555a60"
            />
          </linearGradient>

          {/* Dark side pillars */}
          <linearGradient
            id="tunnelPillarGradient"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#272c32"
            />

            <stop
              offset="35%"
              stopColor="#454b52"
            />

            <stop
              offset="70%"
              stopColor="#70767d"
            />

            <stop
              offset="100%"
              stopColor="#272c32"
            />
          </linearGradient>

          {/* Inner wall shade */}
          <radialGradient
            id="tunnelInnerShade"
            cx="50%"
            cy="10%"
            r="75%"
          >
            <stop
              offset="0%"
              stopColor="#ffffff"
              stopOpacity="0.20"
            />

            <stop
              offset="48%"
              stopColor="#6f757b"
              stopOpacity="0.08"
            />

            <stop
              offset="100%"
              stopColor="#20252b"
              stopOpacity="0.30"
            />
          </radialGradient>

          {/* Bright edge around opening */}
          <linearGradient
            id="tunnelOpeningEdge"
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#8c9299"
            />

            <stop
              offset="50%"
              stopColor="#f5f6f7"
            />

            <stop
              offset="100%"
              stopColor="#858b92"
            />
          </linearGradient>

          {/* Tunnel shadow */}
          <filter
            id="tunnelShadow"
            x="-25%"
            y="-20%"
            width="150%"
            height="150%"
          >
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="8"
              floodColor="#20242a"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        {/* =========================================
            MAIN TUNNEL WALL
           ========================================= */}

        <path
          d="
            M 0 360
            L 0 45
            L 48 45

            C 56 105 100 143 160 143
            C 220 143 264 105 272 45

            L 320 45
            L 320 360
            Z
          "
          fill="url(#tunnelWallGradient)"
          filter="url(#tunnelShadow)"
        />

        {/* =========================================
            INNER METALLIC SHADING
           ========================================= */}

        <path
          d="
            M 0 360
            L 0 45
            L 48 45

            C 56 105 100 143 160 143
            C 220 143 264 105 272 45

            L 320 45
            L 320 360
            Z
          "
          fill="url(#tunnelInnerShade)"
        />

        {/* =========================================
            LEFT PILLAR
           ========================================= */}

        <path
          d="
            M 0 45
            L 48 45
            L 48 360
            L 0 360
            Z
          "
          fill="url(#tunnelPillarGradient)"
        />

        {/* Left pillar inner highlight */}

        <path
          d="
            M 30 52
            L 48 52
            L 48 360
            L 30 360
            Z
          "
          fill="#969ca3"
          opacity="0.42"
        />

        {/* =========================================
            RIGHT PILLAR
           ========================================= */}

        <path
          d="
            M 272 45
            L 320 45
            L 320 360
            L 272 360
            Z
          "
          fill="url(#tunnelPillarGradient)"
        />

        {/* Right pillar inner highlight */}

        <path
          d="
            M 272 52
            L 291 52
            L 291 360
            L 272 360
            Z
          "
          fill="#969ca3"
          opacity="0.42"
        />

        {/* =========================================
            CURVED OPENING RIM
           ========================================= */}

        <path
          d="
            M 48 45
            C 56 105 100 143 160 143
            C 220 143 264 105 272 45
          "
          fill="none"
          stroke="url(#tunnelOpeningEdge)"
          strokeWidth="9"
          strokeLinecap="round"
        />

        {/* Soft inner edge shadow */}

        <path
          d="
            M 48 50
            C 60 110 102 137 160 137
            C 218 137 260 110 272 50
          "
          fill="none"
          stroke="#454b51"
          strokeWidth="4"
          strokeOpacity="0.55"
        />

        {/* =========================================
            TOP PILLAR CAPS
           ========================================= */}

        <rect
          x="0"
          y="34"
          width="48"
          height="16"
          rx="2"
          fill="#3a4047"
        />

        <rect
          x="272"
          y="34"
          width="48"
          height="16"
          rx="2"
          fill="#3a4047"
        />

        <rect
          x="9"
          y="38"
          width="26"
          height="4"
          fill="#7e848a"
          opacity="0.65"
        />

        <rect
          x="285"
          y="38"
          width="26"
          height="4"
          fill="#7e848a"
          opacity="0.65"
        />
      </svg>
    </div>
  );
}