import { StaticCanvas } from "fabric";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// https://immerjs.github.io/immer/typescript/#cast-utilities
import { castDraft } from "immer";

import demoVideo from "@/assets/demo-video.mp4";
import { Result, TunningOptions, WIZARD_TABS } from "./app.types";

type AppState = {
  videoUrl: string;
  videoInstance?: HTMLVideoElement;
  canvasInstance?: StaticCanvas;
  selectedTab: WIZARD_TABS;
  tunningOptions: TunningOptions;
  isSocketReady: boolean;
  isVideoPlaying: boolean;
  tableData: Result[];
};

type AppActions = {
  setCanvasInstance: (payload: StaticCanvas) => void;
  setVideoInstance: (payload: HTMLVideoElement) => void;
  setVideoUrl: (payload: string) => void;
  setSelectedTab: (payload: WIZARD_TABS) => void;
  setIsSocketReady: (payload: boolean) => void;
  setTunning: (payload: TunningOptions) => void;
  setIsVideoPlaying: (payload: boolean) => void;
  setTableData: (payload: Result) => void;
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
  tableData: [],
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
      setIsSocketReady: (payload) => {
        set((state) => {
          state.isSocketReady = payload;
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
      setTableData: (payload) => {
        set((state) => {
          const data = state.tableData;
          if (data.length === 10) {
            data.pop();
          }
          state.tableData = [payload, ...data];
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
const useTableData = () => useAppStore((state) => state.tableData);

export {
  useAppActions,
  useVideoInstance,
  useVideoUrl,
  useSelectedTab,
  useCanvasInstance,
  useTunningOptions,
  useSocketStatus,
  useIsVideoPlaying,
  useTableData,
};
