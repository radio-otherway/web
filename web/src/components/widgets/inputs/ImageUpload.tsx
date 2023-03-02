/* eslint-disable @next/next/no-img-element */
import React from "react";
import Dropzone, { DropzoneRef, useDropzone } from "react-dropzone";

const ImageUpload = () => {
  const dropzoneRef = React.createRef<DropzoneRef>();
  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open();
    }
  };
  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpg": [".jpg", ".jpeg"],
      }}
      maxFiles={1}
      ref={dropzoneRef}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => {
        return (
          <div className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              {acceptedFiles?.length ? (
                <div id="preview">
                  {acceptedFiles[0] && (
                    <img
                      alt="Uploaded image"
                      className="object-cover"
                      src={URL.createObjectURL(acceptedFiles[0])}
                    />
                  )}
                </div>
              ) : (
                <div id="drop">
                  <div className="flex items-center justify-center w-full"></div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};
export default ImageUpload;
