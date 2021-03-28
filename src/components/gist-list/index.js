import React from "react";
import { GistSummaryContainer } from "../gist-summary-container";
import "./index.css";

// Component that manages the list of searched gist results
export const GistList = ({ gists, manageShowGistDetails }) => {
  return (
    <div className="gist-list-container">
      {gists.length > 0 ? (
        gists.map((gist) => (
          <GistSummaryContainer
            key={gist.id}
            gist={gist}
            manageShowGistDetails={manageShowGistDetails}
          />
        ))
      ) : (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};
