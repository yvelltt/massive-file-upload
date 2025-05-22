import { useLoadingStore } from '../../store/loadingStore';

export function LoadingContext() {
  const loading = useLoadingStore((state) => state.loading);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 shadow text-xl font-bold">
        Loading...
      </div>
    </div>
  );
}