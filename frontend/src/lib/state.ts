import ReactPlayer from "react-player/file";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// https://immerjs.github.io/immer/typescript/#cast-utilities
import { castDraft } from "immer";

import demoVideo from "@/assets/demo-video.mp4";

type AppState = {
  videoUrl: string;
  capturedImage?: string;
  videoInstance?: ReactPlayer;
};

type AppActions = {
  setVideoInstance: (payload: ReactPlayer) => void;
  setVideoUrl: (payload: string) => void;
  setCapturedImage: (payload: string) => void;
};

type AppStore = {
  actions: AppActions;
} & AppState;

const initialState: AppState = {
  videoUrl: demoVideo,
  capturedImage: "",
  videoInstance: undefined,
};

const useAppStore = create<AppStore>()(
  immer((set) => ({
    ...initialState,
    actions: {
      setCapturedImage: (payload) =>
        set((state) => {
          state.capturedImage = payload;
        }),
      setVideoInstance: (payload) => {
        set((state) => {
          state.videoInstance = castDraft(payload);
        });
      },
      setVideoUrl: (payload) => {
        set((state) => {
          state.videoUrl = payload;
        });
      },
    },
  }))
);

const useAppActions = () => useAppStore((state) => state.actions);
const useVideoUrl = () => useAppStore((state) => state.videoUrl);
const useCapturedImage = () => useAppStore((state) => state.capturedImage);
const useVideoInstance = () => useAppStore((state) => state.videoInstance);

export { useAppActions, useVideoInstance, useCapturedImage, useVideoUrl };
