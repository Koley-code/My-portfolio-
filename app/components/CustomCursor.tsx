'use client';

import { useEffect } from 'react';
import { clockCursor } from 'cursor-effects';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = clockCursor();

    return () => {
      cursor.destroy();
    };
  }, []);

  return null;
}
