import React, { useEffect, useRef, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { MediaBG, MediaIcon } from "@svg-icons";
import Button from "./Button";

const MediaUploader = ({
  info = "Add image",
  label,
  value,
  onSelect,
  onDelete,
}) => {
  const mediaFrameRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState({ url: "" });
  const [onSelectToggler, setOnSelectToggler] = useState(false);

  useEffect(() => {
    setSelectedImage({ url: value });
  }, [value]);

  useEffect(() => {
    if (onSelect && onSelectToggler) {
      onSelect(selectedImage);
      setOnSelectToggler(false);
    }
  }, [onSelectToggler]);

  useEffect(() => {
    if (typeof wp !== "undefined" && wp.media) {
      // Initialize the WordPress Media Frame
      mediaFrameRef.current = wp.media({
        title: "Select an Image",
        library: { type: "image" }, // Filter for images
        multiple: false, // Allow only one image
        button: { text: "Use This Image" },
      });

      // Add the select handler to handle when an image is selected
      mediaFrameRef.current.on("select", () => {
        const attachment = mediaFrameRef.current
          .state()
          .get("selection")
          .first();
        if (attachment) {
          const image = attachment.toJSON(); // Get image data
          setSelectedImage(image); // Store selected image data
          if (onSelect) {
            // onSelect(image); // Call the onSelect callback with image data
            setOnSelectToggler(true);
          }
        }
      });
    }

    return () => {
      // Clean up the media frame on unmount
      if (mediaFrameRef.current) {
        mediaFrameRef.current.off("select");
      }
    };
  }, []);

  const openMediaFrame = () => {
    if (mediaFrameRef.current) {
      mediaFrameRef.current.open(); // Open the WordPress Media Frame
    }
  };
  const handleDeleteMedia = () => {
    setSelectedImage({ url: "" });
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-media-uploader-wrapper`}>
      {label && <label className="body__medium">{label}</label>}

      {!selectedImage.url && (
        <div className={`${VIRFICE_APP_PREFIX}-media-uploader-empty`}>
          <MediaIcon />
          <div className="body__medium">{info}</div>
          <Button title="Upload" type="secondary" onClick={openMediaFrame} />
        </div>
      )}

      {selectedImage.url && (
        <div className={`${VIRFICE_APP_PREFIX}-media-uploader-has-media`}>
          <img src={selectedImage.url} alt={selectedImage.alt} width={150} />
          <div
            className={`${VIRFICE_APP_PREFIX}-media-uploader-has-media-actions`}
          >
            <Button title="Change" type="secondary" onClick={openMediaFrame} />
            <Button title="Delete" type="danger" onClick={handleDeleteMedia} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaUploader;
