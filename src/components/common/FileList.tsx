import React from "react";

interface FileListProps {
  files: File[];
}

export function FileList({ files }: FileListProps) {
  if (!files.length) {
    return <div className="mt-6 text-gray-400">No files uploaded yet</div>;
  }
  return (
    <div className="mt-6 text-gray-700">
      {files.map((file, i) => (
        <div key={i}>{file.name}</div>
      ))}
    </div>
  );
}
