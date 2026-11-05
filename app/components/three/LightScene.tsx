
'use client';

import PolygonWall2D from './PolygonWall2D';

export default function LightScene() {
  return (
    <div className="fixed inset-0 w-screen h-[100lvh] z-0 isolate pointer-events-none">
      <PolygonWall2D />
    </div>
  );
}
