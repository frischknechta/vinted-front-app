import "./Dropzone.css";

import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropzone = ({ files, setFiles, className }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 5,
  });

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Dépose tes images ici ...</p>
        ) : (
          <div>
            <p>Glisse tes images ici, ou clique pour séléctioner tes images</p>
            <p className="smallP">
              (Seules les images sont acceptées (5 images max.))
            </p>
          </div>
        )}
      </div>
      {files.length > 0 && (
        <ul className="dropzonePreview">
          {files.map((file) => {
            return (
              <li key={file.name}>
                <img
                  src={file.preview}
                  alt="Miniature"
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
                <button onClick={() => removeFile(file.name)}>
                  <FontAwesomeIcon icon="xmark" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Dropzone;
