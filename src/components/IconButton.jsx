import { useRef, useState } from "react";

export default function IconButton({ children, text, color, onClick }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={`
        flex items-center gap-1 px-2 py-1.5
        border border-transparent rounded-md
        text-sm font-medium transition-all duration-200
        hover:border-gray-300 hover:bg-gray-100
        active:scale-95
      `}
    >
      <span className={`${color} transition-transform duration-200`}>
        {children}
      </span>
      <div
        style={{
          width: hovered ? ref.current?.offsetWidth || 0 : 0,
          minWidth: hovered ? "auto" : "0px", 
        }}
        className="overflow-hidden transition-all duration-300 ease-out"
      >
        <span ref={ref} className={`${color} px-1 text-xs whitespace-nowrap`}>
          {text}
        </span>
      </div>
    </button>
  );
}
