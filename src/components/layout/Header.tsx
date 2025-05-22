export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 w-full h-12 bg-black/80 text-white flex items-center justify-between px-4 z-30">
      <h1 className="font-bold text-lg">Massive File Import</h1>
      <button
        className="md:hidden p-2 focus:outline-none"
        onClick={onMenuClick}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
    </header>
  );
}
