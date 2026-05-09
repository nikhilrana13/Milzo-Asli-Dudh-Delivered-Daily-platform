import { useEffect } from "react";

const useLockBodyScroll = (isOpen) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // cleanup
    return () => {
      document.body.style.overflow = "auto";
    };

  }, [isOpen]);

};

export default useLockBodyScroll;