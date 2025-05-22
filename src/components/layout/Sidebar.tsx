import Link from "next/link";

export function Sidebar({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <>
      {/* 桌面 sidebar */}
      <aside className="hidden md:flex flex-col w-52 bg-black/70 h-full p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/demo-download" className="hover:text-blue-400 transition">
              Demo Data Download
            </Link>
          </li>
          <li>
            <Link href="/records" className="hover:text-blue-400 transition">
              Record
            </Link>
          </li>
        </ul>
      </aside>

      {/* 行動裝置 drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 md:hidden ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      >
        <nav
          className={`absolute left-0 top-0 w-56 h-full bg-zinc-900 p-6 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          onClick={e => e.stopPropagation()}
        >
          <ul className="space-y-4">
            <li>
              <Link href="/demo-download" className="text-white hover:text-blue-400 transition" onClick={onClose}>
                Demo Data Download
              </Link>
            </li>
            <li>
              <Link href="/records" className="text-white hover:text-blue-400 transition" onClick={onClose}>
                Record
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
