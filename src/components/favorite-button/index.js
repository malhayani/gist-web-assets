import React from "react";
import { useMutation } from "@apollo/client";
import { favoriteGist } from "../../graphql/mutations/favoriteGist";
import { unfavoriteGist } from "../../graphql/mutations/unfavoriteGist";
import "./index.css";

// Favorite button component
export const FavoriteButton = ({ gist }) => {
  const [favorite] = useMutation(favoriteGist);
  const [unfavorite] = useMutation(unfavoriteGist);

  // Manages favorite button onclick event
  const manageButtonClick = (e, id, favorited) => {
    if (favorited) {
      unfavorite({
        variables: {
          id: id,
        },
      });
    } else {
      favorite({
        variables: {
          id: id,
        },
      });
    }
  };

  return (
    <button
      className="favorite-button"
      onClick={(e) => manageButtonClick(e, gist.id, gist.favorited)}
    >
      <span
        className={
          gist.favorited === true ? "favorited-icon" : "unfavorited-icon"
        }
        aria-label={gist.favorited === false ? "favorite" : "unfavorite"}
      >
        &#9733;
      </span>
    </button>
  );
};
