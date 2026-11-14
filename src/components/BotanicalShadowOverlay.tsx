'use client';

import React from 'react';

export default function BotanicalShadowOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Top-Right Sunlight Dappled Botanical Leaf Shadows */}
      <div className="absolute -top-10 -right-10 w-[380px] sm:w-[480px] h-[340px] sm:h-[420px] opacity-75 mix-blend-multiply filter blur-[3px]">
        <svg
          viewBox="0 0 500 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#523B28]/25"
        >
          {/* Main stem branch */}
          <path
            d="M500 0 C420 60 360 140 330 250 C310 320 290 390 280 440"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Leaf fronds */}
          <path
            d="M450 40 C380 45 340 70 310 110 C340 120 400 100 450 40 Z"
            fill="currentColor"
          />
          <path
            d="M410 90 C340 110 300 150 280 200 C315 205 370 175 410 90 Z"
            fill="currentColor"
          />
          <path
            d="M370 150 C300 175 260 220 240 280 C275 285 330 250 370 150 Z"
            fill="currentColor"
          />
          <path
            d="M340 220 C280 250 240 300 220 370 C250 370 300 330 340 220 Z"
            fill="currentColor"
          />
          <path
            d="M460 120 C420 160 390 220 380 300 C410 290 450 230 460 120 Z"
            fill="currentColor"
          />
          <path
            d="M480 200 C440 250 420 320 420 400 C450 380 480 310 480 200 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Bottom-Left Sunlit Botanical Leaf Shadow */}
      <div className="absolute -bottom-16 -left-12 w-[340px] sm:w-[440px] h-[360px] sm:h-[460px] opacity-70 mix-blend-multiply filter blur-[4px]">
        <svg
          viewBox="0 0 450 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[#4A3525]/28"
        >
          {/* Main branch rising from corner */}
          <path
            d="M0 500 C80 420 140 340 170 230 C190 160 210 90 220 30"
            stroke="currentColor"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Leaves */}
          <path
            d="M50 450 C120 440 160 410 190 360 C160 350 100 380 50 450 Z"
            fill="currentColor"
          />
          <path
            d="M90 390 C160 370 200 330 220 270 C185 265 130 300 90 390 Z"
            fill="currentColor"
          />
          <path
            d="M130 320 C200 295 240 245 260 180 C225 180 170 220 130 320 Z"
            fill="currentColor"
          />
          <path
            d="M160 240 C220 205 260 150 280 80 C250 85 200 130 160 240 Z"
            fill="currentColor"
          />
          <path
            d="M40 360 C80 310 110 240 120 160 C90 180 50 250 40 360 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
