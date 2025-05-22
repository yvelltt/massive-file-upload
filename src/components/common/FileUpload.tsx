"use client"
import React, { useState } from "react";
import { DropZone } from "./DropZone";
import { FileList } from "./FileList";
import { useSSE } from "@/hooks/useSSE";
import { getGuid, uploadFile } from "@/hooks/upload";
import { ProgressBox } from "./ProgressBox";


export default function FileUpload() {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState('');
    const [sseUrl, setSseUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useSSE(
        sseUrl,
        (msg) => {
            console.log('Received SSE message:', msg);
            setProgress(msg);
        },
        () => {
            console.log('Upload completed');
            setIsUploading(false);
        },
        () => {
            console.log('Connection closed');
            setProgress('連線中斷');
        }
    );

    const handleFiles = (fileList: FileList) => {
        const validFiles: File[] = [];
        for (const file of Array.from(fileList)) {
            validFiles.push(file);
        }
        setFiles(validFiles);
    };

    const handleUpload = async () => {
        if (files.length < 0) return;
        setIsUploading(true);
        const guid = await getGuid();
        setSseUrl(`/Upload/progress?uuid=${guid}`);
        await uploadFile(files, guid);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
            <div className="text-2xl font-semibold mb-2 text-gray-800">File Upload</div>
            <div className="text-gray-500 mb-6">Drag & drop files or click to browse</div>
            <DropZone
                onFiles={handleFiles}
                dragActive={dragActive}
                setDragActive={setDragActive}
            />
            <FileList files={files} />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isUploading}
                onClick={handleUpload} >
                上傳檔案
            </button>
            <ProgressBox progress={progress} />
        </div>
    );
}
