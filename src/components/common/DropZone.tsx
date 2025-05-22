"use client"
import React, { useRef } from "react";

interface DropZoneProps {
  onFiles: (files: FileList) => void;
  dragActive: boolean;
  setDragActive: (v: boolean) => void;
}

export function DropZone({ onFiles, dragActive, setDragActive }: DropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files) {
      onFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      className={`w-[420px] p-8 bg-white rounded-2xl border-2 ${
        dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-blue-300"
      } flex flex-col items-center transition-all duration-200`}
      onDragOver={e => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      style={{ cursor: "pointer" }}
    >
      <img
        src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f4c1.svg"
        alt="folder"
        className="w-12 h-12 mb-2"
      />
      <div className="text-blue-600 text-lg font-medium mb-2">Drop files here</div>
      <div className="text-gray-400 text-sm mb-4">
        Supported formats: XLSX, CSV
      </div>
      <button
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition mb-2"
        type="button"
      >
        Browse Files
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.csv"
        className="hidden"
        onChange={e => {
          if (e.target.files) onFiles(e.target.files);
        }}
      />
    </div>
  );
}
