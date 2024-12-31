import React, { useEffect, useRef } from "react";
import "./Cursor.css";

interface CursorProps {
  cursorSize?: number,
  cursorUrl?: string,
}

export default function Cursor({cursorSize=28, cursorUrl="1"}:CursorProps): JSX.Element {
  const cursor = useRef<HTMLDivElement>(null);
  const  onMouseMove = (event: MouseEvent)=>{
    const currentCursor = cursor.current;
    if(!currentCursor) return;
    currentCursor.style.left = `${event.clientX+16}px`;
    currentCursor.style.top = `${event.clientY+16}px`;
  }

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return (
    <div className="cr-cursor" ref={cursor} style={{"--cr-cursor-size": `${cursorSize}px`,} as React.CSSProperties}>
      <img src={`cursors/${cursorUrl}.svg`} alt="cursor" />
    </div>
  );
};