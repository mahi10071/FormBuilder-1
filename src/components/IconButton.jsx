import { useRef } from "react";
import { useState } from "react";

export default function IconButton({ children, text, color }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex p-2 items-center rounded-lg
        border shadow-lg
      `}
    >
     
      <span className={`${color} mr-2`}>{children}</span>
      <div
        style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 }}
        className="overflow-x-hidden transition-all duration-300 ease-out"
      >
        <span ref={ref} className={`${color} px-1.5`}>
          {text}
        </span>
      </div>
    </button>
  );
}
