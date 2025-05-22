const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

import { useEffect, useRef } from 'react';

export function useSSE(
    url: string | null,
    onMessage: (msg: string) => void,
    onDone?: () => void,
    onError?: () => void,
) {
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!url) return;
        const es = new EventSource(API_BASE_URL + url);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            if (event.data === 'done') {
                onMessage('完成！');
                if (onDone) onDone();
                es.close();
            } else {
                onMessage(event.data);
            }
        };
        es.onerror = () => {
            if (onError) onError();
            es.close();
        };
        return () => es.close();
    }, [url]);
}
