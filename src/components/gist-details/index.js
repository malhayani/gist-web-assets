import React from "react";
import { GistSummaryContainer } from "../gist-summary-container";
import "./index.css";

// Component that manages the display of additional gist details
export const GistDetails = ({ gist }) => {
  // Opens the contents of the file in another tab
  const openFile = (url) => {
    window.open(url, "_blank").focus();
  };

  return (
    <div className="gist-details-container">
      <GistSummaryContainer gist={gist} manageShowGistDetails={() => null} />
      {gist.files.map((file) => (
        <section
          key={file.filename}
          className="gist-container"
          onClick={() => openFile(file.raw_url)}
        >
          <div>Filename: {file.filename}</div>
          <div>Type: {file.type}</div>
          <div>Language: {file.language}</div>
          <div>Size: {file.size}</div>
        </section>
      ))}
    </div>
  );
};
