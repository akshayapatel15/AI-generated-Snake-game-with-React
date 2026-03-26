import React, { useState, useEffect, useRef } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "DATA_STREAM_01",
    artist: "AI_CORE_ALPHA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "MEM_DUMP_02",
    artist: "AI_CORE_BETA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "SYS_OVERRIDE",
    artist: "AI_CORE_GAMMA",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=400&auto=format&fit=crop"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full font-vt">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
      />
      
      <div className="border-b-2 border-cyan-glitch pb-2 mb-4 flex justify-between items-end">
        <h2 className="text-3xl text-cyan-glitch glitch-text" data-text="AUDIO_SUBSYSTEM">AUDIO_SUBSYSTEM</h2>
        <span className="text-magenta-glitch text-xl animate-pulse">
          {isPlaying ? 'STREAMING...' : 'IDLE'}
        </span>
      </div>
      
      <div className="flex items-center gap-4 mb-6 border-2 border-magenta-glitch p-2 bg-black">
        <div className="relative w-20 h-20 overflow-hidden border-2 border-cyan-glitch grayscale contrast-150">
          <img 
            src={currentTrack.cover} 
            alt="COVER_ART" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="flex gap-1 items-end h-10">
                <div className="w-3 bg-cyan-glitch animate-[bounce_0.5s_infinite] h-full"></div>
                <div className="w-3 bg-magenta-glitch animate-[bounce_0.3s_infinite_0.1s] h-2/3"></div>
                <div className="w-3 bg-cyan-glitch animate-[bounce_0.7s_infinite_0.2s] h-full"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-pixel text-xs truncate mb-2">
            ID: {currentTrack.title}
          </h3>
          <p className="text-magenta-glitch text-xl truncate">
            SRC: {currentTrack.artist}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-cyan-glitch text-2xl mb-2">
          <span>T-{formatTime(progress)}</span>
          <span>T-{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleProgressChange}
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-cyan-glitch hover:text-white transition-colors text-xl"
          >
            {isMuted || volume === 0 ? '[MUTED]' : '[VOL]'}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              setIsMuted(false);
            }}
            className="w-24"
          />
        </div>

        <div className="flex items-center gap-4 font-pixel text-xs">
          <button 
            onClick={skipBackward}
            className="text-cyan-glitch hover:text-magenta-glitch hover:bg-cyan-glitch/20 px-2 py-2 border border-cyan-glitch"
          >
            &lt;&lt;
          </button>
          <button 
            onClick={togglePlay}
            className="text-black bg-cyan-glitch hover:bg-magenta-glitch hover:text-white px-4 py-2 border-2 border-white"
          >
            {isPlaying ? 'HALT' : 'EXEC'}
          </button>
          <button 
            onClick={skipForward}
            className="text-cyan-glitch hover:text-magenta-glitch hover:bg-cyan-glitch/20 px-2 py-2 border border-cyan-glitch"
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </div>
  );
}
