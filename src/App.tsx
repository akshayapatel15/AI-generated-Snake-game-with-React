/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden font-vt text-cyan-glitch">
      <div className="scanlines"></div>
      <div className="crt-flicker"></div>

      <header className="relative z-10 w-full p-6 border-b-4 border-magenta-glitch bg-black">
        <h1 className="text-3xl md:text-5xl font-pixel glitch-text uppercase" data-text="SYS.OP.SNAKE_PROTOCOL">
          SYS.OP.SNAKE_PROTOCOL
        </h1>
        <p className="text-magenta-glitch font-vt text-2xl tracking-widest mt-4 uppercase">
          &gt; STATUS: ONLINE // AWAITING_INPUT
        </p>
      </header>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-start justify-center gap-12 p-8 md:p-12 max-w-7xl mx-auto w-full">
        
        {/* Left/Top: Game Area */}
        <div className="flex-1 flex justify-center items-center w-full box-glitch bg-black border-2 border-cyan-glitch p-6">
          <SnakeGame />
        </div>

        {/* Right/Bottom: Music Player */}
        <div className="w-full lg:w-96 flex-shrink-0 box-glitch bg-black border-2 border-magenta-glitch p-6">
          <MusicPlayer />
        </div>

      </main>
    </div>
  );
}
