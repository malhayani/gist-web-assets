import React from "react";
import { FavoriteButton } from "../favorite-button";
import "./index.css";

// Wrapper component for each gist
export const GistSummaryContainer = ({ gist, manageShowGistDetails }) => {
  return (
    <div className="gist-container">
      <section
        className="gist-user-information"
        onClick={() => manageShowGistDetails(gist)}
      >
        <img
          src={gist.avatar_url}
          className="avatar-icon"
          alt="github-profile"
        />
        <p>{gist.owner}</p>
      </section>

      <section
        className="gist-information"
        onClick={() => manageShowGistDetails(gist)}
      >
        <p>
          <span>Description:</span> {gist.description}
        </p>
        <p>
          <span>Created At:</span> {gist.created_at}
        </p>
        <p>
          <span>Last Updated At:</span> {gist.updated_at}
        </p>
      </section>

      <section className="gist-additional-details">
        <FavoriteButton gist={gist} />
        <a href={gist.html_url} className="gist-github-link">
          View on GitHub
        </a>
      </section>
    </div>
  );
};
