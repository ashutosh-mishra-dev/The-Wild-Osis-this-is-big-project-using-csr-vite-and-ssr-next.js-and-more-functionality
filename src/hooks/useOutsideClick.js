import { useEffect, useRef } from "react";

// ---------------- yah ek custom hook hai --------------------
// useOutsideClick(handler, listenerCapturing) : parameter me handler outside function jai ex jaise ki modal se aa rha h close function
//listenerCapturing : jab ham addEventListener likhate h to usame bub
export function useOutsideClick(handler, listenerCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenerCapturing); // true lagana jaruri h becouse event bubbling problem na ho

      return () =>
        document.removeEventListener("click", handleClick, listenerCapturing); // true lagana jaruri h becouse event bubbling problem na ho
    },
    [handler, listenerCapturing]
  );

  return ref;
}
