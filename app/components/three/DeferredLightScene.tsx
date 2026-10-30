'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LightScene = dynamic(() => import('./LightScene'), {
    ssr: false,
    loading: () => null,
});

export default function DeferredLightScene() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        let delayTimer: number | undefined;
        let fallbackTimer: number | undefined;
        let idleCallbackId: number | undefined;

        const idleWindow = window as Window & {
            requestIdleCallback?: (
                callback: () => void,
                options?: { timeout: number }
            ) => number;
            cancelIdleCallback?: (id: number) => void;
        };

        delayTimer = window.setTimeout(() => {
            if (idleWindow.requestIdleCallback) {
                idleCallbackId = idleWindow.requestIdleCallback(
                    () => setReady(true),
                    { timeout: 2500 }
                );
            } else {
                fallbackTimer = window.setTimeout(
                    () => setReady(true),
                    1000
                );
            }
        }, 1500);

        return () => {
            if (delayTimer !== undefined) {
                window.clearTimeout(delayTimer);
            }

            if (fallbackTimer !== undefined) {
                window.clearTimeout(fallbackTimer);
            }

            if (idleCallbackId !== undefined) {
                idleWindow.cancelIdleCallback?.(idleCallbackId);
            }
        };
    }, []);

    return ready ? <LightScene /> : null;
}