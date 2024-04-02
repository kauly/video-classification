import { StaticCanvas } from "fabric";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// https://immerjs.github.io/immer/typescript/#cast-utilities
import { castDraft } from "immer";

import demoVideo from "@/assets/demo-video.mp4";
import { TunningOptions, WIZARD_TABS } from "./app.types";

type AppState = {
  videoUrl: string;
  videoInstance?: HTMLVideoElement;
  canvasInstance?: StaticCanvas;
  selectedTab: WIZARD_TABS;
  tunningOptions: TunningOptions;
  isSocketReady: boolean;
  isVideoPlaying: boolean;
};

type AppActions = {
  setCanvasInstance: (payload: StaticCanvas) => void;
  setVideoInstance: (payload: HTMLVideoElement) => void;
  setVideoUrl: (payload: string) => void;
  setSelectedTab: (payload: WIZARD_TABS) => void;
  setIsSocketReady: () => void;
  setTunning: (payload: TunningOptions) => void;
  setIsVideoPlaying: (payload: boolean) => void;
};

type AppStore = {
  actions: AppActions;
} & AppState;

const initialState: AppState = {
  selectedTab: WIZARD_TABS.setup,
  videoUrl: demoVideo,
  videoInstance: undefined,
  canvasInstance: undefined,
  isSocketReady: false,
  isVideoPlaying: false,
  tunningOptions: {
    confidence: 0.7,
    iou: 0.5,
  },
};

const useAppStore = create<AppStore>()(
  immer((set) => ({
    ...initialState,
    actions: {
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
      setSelectedTab: (payload) => {
        set((state) => {
          state.selectedTab = payload;
        });
      },
      setCanvasInstance: (payload) => {
        set((state) => {
          state.canvasInstance = castDraft(payload);
        });
      },
      setIsSocketReady: () => {
        set((state) => {
          state.isSocketReady = true;
        });
      },
      setIsVideoPlaying: (payload) => {
        set((state) => {
          state.isVideoPlaying = payload;
        });
      },
      setTunning: (payload) => {
        set((state) => {
          state.tunningOptions = payload;
        });
      },
    },
  }))
);

const useAppActions = () => useAppStore((state) => state.actions);
const useVideoUrl = () => useAppStore((state) => state.videoUrl);
const useVideoInstance = () => useAppStore((state) => state.videoInstance);
const useSelectedTab = () => useAppStore((state) => state.selectedTab);
const useCanvasInstance = () => useAppStore((state) => state.canvasInstance);
const useTunningOptions = () => useAppStore((state) => state.tunningOptions);
const useSocketStatus = () => useAppStore((state) => state.isSocketReady);
const useIsVideoPlaying = () => useAppStore((state) => state.isVideoPlaying);

export {
  useAppActions,
  useVideoInstance,
  useVideoUrl,
  useSelectedTab,
  useCanvasInstance,
  useTunningOptions,
  useSocketStatus,
  useIsVideoPlaying,
};
