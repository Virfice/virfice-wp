import React, { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

const Iframe = ({ src, id }) => {
  const [debounceSrc, setDebounceSrc] = useState(src); // Initialize with initial src
  const [iframeHeight, setIframeHeight] = useState(658); // Initial height
  const iframeRef = useRef(null);

  useEffect(() => {
    // Debounce setting the source to prevent rapid changes
    const debouncedSetSrc = debounce((newSrc) => {
      setDebounceSrc(newSrc);
    }, 200); // Adjust the debounce time as needed

    // Call the debounced function with the new src
    debouncedSetSrc(src);

    return () => {
      debouncedSetSrc.cancel(); // Cleanup any pending debounce on unmount
    };
  }, [src]); // Re-run the effect when src changes

  useEffect(() => {
    const resizeIframe = () => {
      if (iframeRef.current) {

        setTimeout(() => {
          // Get the height of the iframe content
          const contentHeight =
            iframeRef.current.contentWindow.document.body.scrollHeight;
          // Set the height of the iframe
          setIframeHeight(contentHeight);
        }, 100);
        
      }
    };

    // Listen for iframe load event to ensure content is loaded
    const iframeLoadHandler = () => {
      resizeIframe();
    };

    if (iframeRef.current) {
      // Attach load event listener to iframe
      iframeRef.current.addEventListener("load", iframeLoadHandler);
    }

    // Clean up event listener when component unmounts
    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener("load", iframeLoadHandler);
      }
    };
  }, [debounceSrc]);

  return <iframe id={id} src={debounceSrc} style={{ height: iframeHeight }} ref={iframeRef} />;
};

export default Iframe;
