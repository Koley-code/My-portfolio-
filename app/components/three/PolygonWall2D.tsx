'use client';

export default function PolygonWall2D() {
    return (
        <div
            className="fixed left-0 top-0 w-screen h-[100lvh] pointer-events-none -z-20 overflow-hidden"
            aria-hidden="true"
        >
            <svg
                viewBox="0 0 1200 675"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full"
            >
                <defs>
                    {/* Base wall */}
                    <linearGradient id="wallBase" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f6f6f6" />
                        <stop offset="100%" stopColor="#e8e9ea" />
                    </linearGradient>

                    {/* Tile face gradients */}
                    <linearGradient id="tileWhite" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="58%" stopColor="#f2f2f2" />
                        <stop offset="100%" stopColor="#dcdedf" />
                    </linearGradient>

                    <linearGradient id="tileLight" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fafafa" />
                        <stop offset="60%" stopColor="#ededee" />
                        <stop offset="100%" stopColor="#d7d9db" />
                    </linearGradient>

                    <linearGradient id="tileDark" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#eeeeee" />
                        <stop offset="65%" stopColor="#d7d9dc" />
                        <stop offset="100%" stopColor="#c4c7ca" />
                    </linearGradient>

                    {/* Soft depth shadow */}
                    <filter
                        id="tileShadow"
                        x="-30%"
                        y="-30%"
                        width="160%"
                        height="170%"
                    >
                        <feDropShadow
                            dx="10"
                            dy="13"
                            stdDeviation="10"
                            floodColor="#52565b"
                            floodOpacity="0.30"
                        />
                    </filter>

                    {/* Deeper contact shadow */}
                    <filter
                        id="contactShadow"
                        x="-40%"
                        y="-40%"
                        width="180%"
                        height="180%"
                    >
                        <feGaussianBlur stdDeviation="5" />
                    </filter>
                </defs>

                {/* =========================================
            BASE WALL
           ========================================= */}

                <rect
                    x="0"
                    y="0"
                    width="1200"
                    height="675"
                    fill="url(#wallBase)"
                />

                {/* =========================================
            SOFT BACKGROUND SHADOW AREAS
           ========================================= */}

                <g opacity="0.55" filter="url(#contactShadow)">
                    <path
                        d="M0 105 L140 55 L205 120 L145 225 L45 245 Z"
                        fill="#aeb2b6"
                    />

                    <path
                        d="M205 0 L370 0 L420 115 L330 155 L220 105 Z"
                        fill="#b2b5b9"
                    />

                    <path
                        d="M420 115 L515 55 L635 110 L595 225 L485 210 Z"
                        fill="#a7abb0"
                    />

                    <path
                        d="M650 90 L770 25 L870 90 L825 200 L710 210 Z"
                        fill="#b3b6ba"
                    />

                    <path
                        d="M890 105 L1055 55 L1145 130 L1110 245 L985 225 Z"
                        fill="#abb0b5"
                    />

                    <path
                        d="M190 250 L330 205 L430 280 L395 390 L260 415 Z"
                        fill="#a3a8ad"
                    />

                    <path
                        d="M470 225 L610 190 L715 260 L690 370 L555 400 Z"
                        fill="#a8acb1"
                    />

                    <path
                        d="M760 245 L900 205 L1015 285 L965 395 L830 380 Z"
                        fill="#a5a9ae"
                    />
                </g>

                {/* =========================================
            TOP / LEFT TILES
           ========================================= */}

                <g filter="url(#tileShadow)">
                    <polygon
                        points="0,0 83,0 112,85 60,122 0,98"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="83,0 215,0 245,67 190,120 112,85"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="215,0 360,0 365,95 306,124 245,67"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="360,0 500,0 500,58 420,108 365,95"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="500,0 650,0 620,91 540,121 500,58"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="650,0 805,0 835,72 770,128 620,91"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="805,0 955,0 932,92 835,72"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="955,0 1100,0 1145,84 1040,122 932,92"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="1100,0 1200,0 1200,115 1145,84"
                        fill="url(#tileLight)"
                    />
                </g>

                {/* =========================================
            SECOND BAND
           ========================================= */}

                <g filter="url(#tileShadow)">
                    <polygon
                        points="0,98 60,122 112,85 155,165 103,255 0,238"
                        fill="url(#tileDark)"
                    />

                    <polygon
                        points="112,85 190,120 242,72 306,124 295,225 185,246 155,165"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="306,124 365,95 420,108 490,174 420,235 295,225"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="420,108 540,121 620,91 675,154 595,229 490,174"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="675,154 770,128 835,72 910,130 865,230 790,250"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="910,130 1040,122 1145,84 1170,175 1080,250 965,225"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="1145,84 1200,115 1200,262 1170,175"
                        fill="url(#tileLight)"
                    />
                </g>

                {/* =========================================
            CENTRAL PROMINENT TILES
           ========================================= */}

                <g filter="url(#tileShadow)">
                    <polygon
                        points="103,255 185,246 260,305 245,392 125,375 76,316"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="260,305 295,225 420,235 455,315 395,402 245,392"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="455,315 490,174 595,229 575,332 520,415"
                        fill="url(#tileDark)"
                    />

                    <polygon
                        points="595,229 675,154 790,250 735,348 640,345"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="790,250 865,230 965,225 1008,310 948,396 830,380 735,348"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="1008,310 1080,250 1170,175 1200,262 1200,370 1118,405"
                        fill="url(#tileWhite)"
                    />
                </g>

                {/* =========================================
            LOWER BAND
           ========================================= */}

                <g filter="url(#tileShadow)">
                    <polygon
                        points="0,238 76,316 125,375 86,470 0,454"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="125,375 245,392 310,465 250,545 115,510 86,470"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="245,392 395,402 430,485 345,565 250,545 310,465"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="430,485 520,415 640,345 685,445 625,545 520,590 345,565"
                        fill="url(#tileDark)"
                    />

                    <polygon
                        points="685,445 735,348 830,380 900,455 850,550 745,535"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="900,455 1008,310 1118,405 1100,505 980,560"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="1100,505 1118,405 1200,370 1200,530"
                        fill="url(#tileWhite)"
                    />
                </g>

                {/* =========================================
            BOTTOM EDGE
           ========================================= */}

                <g filter="url(#tileShadow)">
                    <polygon
                        points="0,454 86,470 115,510 90,675 0,675"
                        fill="url(#tileDark)"
                    />

                    <polygon
                        points="115,510 250,545 270,675 90,675"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="250,545 345,565 430,485 520,590 500,675 270,675"
                        fill="url(#tileWhite)"
                    />

                    <polygon
                        points="520,590 625,545 745,535 805,675 500,675"
                        fill="url(#tileLight)"
                    />

                    <polygon
                        points="745,535 850,550 980,560 1020,675 805,675"
                        fill="url(#tileDark)"
                    />

                    <polygon
                        points="980,560 1100,505 1200,530 1200,675 1020,675"
                        fill="url(#tileWhite)"
                    />
                </g>

                {/* =========================================
            NATURAL SEAM ACCENTS
           ========================================= */}

                <g
                    fill="none"
                    stroke="#8f9499"
                    strokeOpacity="0.55"
                    strokeWidth="1.3"
                >
                    <path d="M83 0 L112 85 L60 122" />
                    <path d="M215 0 L245 67 L190 120" />
                    <path d="M365 95 L420 108" />
                    <path d="M620 91 L675 154" />
                    <path d="M835 72 L910 130" />
                    <path d="M60 122 L155 165" />
                    <path d="M295 225 L395 402" />
                    <path d="M490 174 L520 415" />
                    <path d="M735 348 L830 380" />
                    <path d="M1008 310 L1118 405" />
                    <path d="M86 470 L125 375" />
                    <path d="M250 545 L345 565" />
                    <path d="M625 545 L745 535" />
                    <path d="M850 550 L980 560" />
                </g>
            </svg>
        </div>
    );
}