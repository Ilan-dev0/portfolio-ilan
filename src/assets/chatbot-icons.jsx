import React from 'react';

export const GhostBotIcon = () => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <defs>
      <radialGradient id="ghostGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#a8b8ff" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#4c6ef5" stopOpacity="0.2" />
      </radialGradient>
    </defs>
    <g transform="translate(2, 2)">
      <path
        d="M30 4C17.85 4 8 13.85 8 26v24c0 2 1.7 3.8 4 3.8 2.3 0 4-1.8 4-3.8V38h4v12c0 2 1.7 3.8 4 3.8 2.3 0 4-1.8 4-3.8V38h4v12c0 2 1.7 3.8 4 3.8 2.3 0 4-1.8 4-3.8V38h4v12c0 2 1.7 3.8 4 3.8 2.3 0 4-1.8 4-3.8V26C52 13.85 42.15 4 30 4z"
        fill="url(#ghostGlow)"
        stroke="#4c6ef5"
        strokeWidth="2"
      />
      <circle cx="22" cy="24" r="4" fill="#4c6ef5" />
      <circle cx="38" cy="24" r="4" fill="#4c6ef5" />
    </g>
  </svg>
);

export const UserIcon = () => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
  >
    <circle
      cx="32"
      cy="32"
      r="28"
      fill="#1a1a1a"
      stroke="#6d28d9"
      strokeWidth="2"
    />
    <path
      d="M32 36c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11zm0 2c7.732 0 14 2.268 14 5v3H18v-3c0-2.732 6.268-5 14-5z"
      fill="#6d28d9"
    />
  </svg>
);