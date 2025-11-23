import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow:(windowKey, data = null) => 
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                state.nextZIndex += 1;
            }   
        ),

        closeWindow:(windowKey) =>             
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            } 
        ),

        focusWindow:(windowKey) => 
            set((state) => {
                const win = state.windows[windowKey];
                win.zIndex = state.nextZIndex++;
            }
        ),
    }))
);

export default useWindowStore;