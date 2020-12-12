import { useEffect } from "react";

export const useOnClickOutside = (
    ref: React.RefObject<HTMLElement>,
    handler:(event: MouseEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            const element = event.target as HTMLElement;
            const parent = ref.current;

            if (parent! || parent.contains(element)) {
                return;
            }

            handler(event);
        };
  
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
  
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}