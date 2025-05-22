import { create } from 'zustand';

type LoadingState = {
  loadingCount: number;
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useLoadingStore = create<LoadingState>((set, get) => ({
  loadingCount: 0,
  loading: false,
  startLoading: () => {
    const count = get().loadingCount + 1;
    set({ loadingCount: count, loading: true });
  },
  stopLoading: () => {
    const count = get().loadingCount - 1;
    set({
      loadingCount: count,
      loading: count > 0,
    });
  },
}));
