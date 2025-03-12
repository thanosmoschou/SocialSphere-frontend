'use client';

import { useState, useEffect } from "react";

export const useScreenWidth = () => {
    const [width, setWidth] = useState<number | null>();

    useEffect(() => {
        setWidth(window.innerWidth);

        const handleResize = () => {
            setWidth(window.innerWidth);
          };
      
          window.addEventListener("resize", handleResize);
          return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
}