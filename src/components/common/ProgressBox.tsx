type ProgressBoxProps = {
  progress: string;
};

export function ProgressBox({ progress }: ProgressBoxProps) {
  return (
    <div className="mt-6 w-200 h-50 flex items-center justify-center border rounded bg-gray-100 text-gray-600 overflow-x-auto p-4">
      {progress}
    </div>
  );
}
