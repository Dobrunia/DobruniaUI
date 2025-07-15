import { useCallback, useRef, useState } from 'react';

interface AudioPlayerState {
  progress: Record<string, number>;
  isPlaying: Record<string, boolean>;
}

export const useAudioPlayer = () => {
  const [state, setState] = useState<AudioPlayerState>({
    progress: {},
    isPlaying: {},
  });
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const handleAudioPlay = useCallback(
    (url: string) => {
      const audio = audioRefs.current[url];
      if (!audio) return;

      if (state.isPlaying[url]) {
        audio.pause();
        setState((prev) => ({
          ...prev,
          isPlaying: { ...prev.isPlaying, [url]: false },
        }));
      } else {
        // Stop all other audio
        Object.values(audioRefs.current).forEach((a) => a.pause());
        setState((prev) => ({
          ...prev,
          isPlaying: Object.keys(prev.isPlaying).reduce(
            (acc, key) => ({ ...acc, [key]: false }),
            {}
          ),
        }));

        audio.play();
        setState((prev) => ({
          ...prev,
          isPlaying: { ...prev.isPlaying, [url]: true },
        }));
      }
    },
    [state.isPlaying]
  );

  const handleAudioTimeUpdate = useCallback((url: string) => {
    const audio = audioRefs.current[url];
    if (!audio) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    setState((prev) => ({
      ...prev,
      progress: { ...prev.progress, [url]: progress },
    }));
  }, []);

  const handleAudioEnded = useCallback((url: string) => {
    setState((prev) => ({
      ...prev,
      isPlaying: { ...prev.isPlaying, [url]: false },
      progress: { ...prev.progress, [url]: 0 },
    }));
  }, []);

  const handleAudioProgressClick = useCallback(
    (url: string, e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const audio = audioRefs.current[url];
      if (!audio) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      const time = (percentage / 100) * audio.duration;

      audio.currentTime = time;
      setState((prev) => ({
        ...prev,
        progress: { ...prev.progress, [url]: percentage },
      }));
    },
    []
  );

  const setAudioRef = useCallback((url: string, element: HTMLAudioElement | null) => {
    if (element) {
      audioRefs.current[url] = element;
    }
  }, []);

  return {
    progress: state.progress,
    isPlaying: state.isPlaying,
    handleAudioPlay,
    handleAudioTimeUpdate,
    handleAudioEnded,
    handleAudioProgressClick,
    setAudioRef,
  };
};
