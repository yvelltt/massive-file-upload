type ProgressBoxProps = {
  progress: string;
};

export function ProgressBox({ progress }: ProgressBoxProps) {
  return (
    <div className="mt-6 w-150 h-16 flex items-center justify-center border rounded bg-gray-100 text-gray-600 overflow-x-auto">
      {progress}
    </div>
  );
}
