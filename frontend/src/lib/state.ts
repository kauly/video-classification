import { StaticCanvas } from "fabric";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// https://immerjs.github.io/immer/typescript/#cast-utilities
import { castDraft } from "immer";

import demoVideo from "@/assets/demo-video.mp4";
import { TABS_NAMES } from "./app.types";

import type { Dimensions } from "./app.types";

type AppState = {
  videoUrl: string;
  capturedImage?: string;
  labeledImage?: string;
  videoInstance?: HTMLVideoElement;
  canvasInstance?: StaticCanvas;
  selectedTab: TABS_NAMES;
  dimensions: Dimensions;
  isSocketReady: boolean;
};

type AppActions = {
  setCanvasInstance: (payload: StaticCanvas) => void;
  setVideoInstance: (payload: HTMLVideoElement) => void;
  setVideoUrl: (payload: string) => void;
  setCapturedImage: (payload: string) => void;
  setLabeledImage: (payload: string) => void;
  setSelectedTab: (payload: TABS_NAMES) => void;
  setDimensions: (payload: Dimensions) => void;
  setIsSocketReady: () => void;
};

type AppStore = {
  actions: AppActions;
} & AppState;

const initialState: AppState = {
  selectedTab: TABS_NAMES.main,
  videoUrl: demoVideo,
  dimensions: {
    height: 0,
    width: 0,
  },
  capturedImage: undefined,
  videoInstance: undefined,
  labeledImage: undefined,
  canvasInstance: undefined,
  isSocketReady: false,
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
      setLabeledImage: (payload) => {
        set((state) => {
          state.labeledImage = payload;
        });
      },
      setSelectedTab: (payload) => {
        set((state) => {
          state.selectedTab = payload;
        });
      },
      setDimensions: (payload) => {
        set((state) => {
          state.dimensions = payload;
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
    },
  }))
);

const useAppActions = () => useAppStore((state) => state.actions);
const useVideoUrl = () => useAppStore((state) => state.videoUrl);
const useCapturedImage = () => useAppStore((state) => state.capturedImage);
const useVideoInstance = () => useAppStore((state) => state.videoInstance);
const useLabeledImage = () => useAppStore((state) => state.labeledImage);
const useSelectedTab = () => useAppStore((state) => state.selectedTab);
const useDimensions = () => useAppStore((state) => state.dimensions);
const useCanvasInstance = () => useAppStore((state) => state.canvasInstance);

export {
  useAppActions,
  useVideoInstance,
  useCapturedImage,
  useVideoUrl,
  useLabeledImage,
  useSelectedTab,
  useDimensions,
  useCanvasInstance,
};
