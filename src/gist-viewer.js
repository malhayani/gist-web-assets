import "./gist-viewer.css";
import React, { useState, useEffect } from "react";
import { GistList } from "./components/gist-list";
import { useLazyQuery } from "@apollo/client";
import { getGistsByUsername } from "./graphql/queries/getGistsByUsername";
import { getGistsById } from "./graphql/queries/getGistsById";
import { getFavoritedGists } from "./graphql/queries/getFavoritedGists";
import { SearchInput } from "./components/search-input";
import { GistDetails } from "./components/gist-details";

function GistViewer() {
  const [searchInformation, setSearchInformation] = useState({
    term: "",
    type: "username",
  });
  const [pageNum, setPageNum] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [detailedGist, setDetailedGist] = useState(null);
  const [gists, setGists] = useState([]);

  // Query to retrieve gists by username
  const [
    searchByUsername,
    { data: gistsByUsername, loading: gistsByUsernameLoading },
  ] = useLazyQuery(getGistsByUsername);

  // Query to retrieve gists by id
  const [
    searchById,
    { data: gistsById, loading: gistsByIdLoading },
  ] = useLazyQuery(getGistsById);

  // Query to retrieve favorited gists
  const [
    searchFavoritedGists,
    { data: favoritedGists, loading: favoritedGistsLoading },
  ] = useLazyQuery(getFavoritedGists);

  // Tracks query results and search information to maintain single list of gists
  useEffect(() => {
    if (searchInformation.type === "username") {
      setGists(gistsByUsername ? gistsByUsername.getGistsByUsername : []);
    } else if (searchInformation.type === "id") {
      setGists(gistsById ? [gistsById.getGistsById] : []);
    } else if (searchInformation.type === "favorites") {
      setGists(favoritedGists ? favoritedGists.getFavoritedGists : []);
    } else {
      setGists([]);
    }
  }, [gistsByUsername, gistsById, favoritedGists, searchInformation.type]);

  // Tracks changes made to the search information to fire off the corresponding query
  useEffect(() => {
    if (searchInformation.type === "username") {
      if (searchInformation.term && pageNum) {
        searchByUsername({
          variables: {
            username: searchInformation.term,
            pageNum: pageNum,
            maxResults: 10,
          },
        });
      }
    } else if (searchInformation.type === "id") {
      searchById({
        variables: {
          id: searchInformation.term,
        },
      });
    } else {
      searchFavoritedGists();
    }
  }, [searchInformation, pageNum]);

  // Manages the show details click event
  const manageShowGistDetails = (gist) => {
    setShowDetails(true);
    setDetailedGist(gist);
  };

  return (
    <section>
      {!showDetails ? (
        <div className="gist-viewer">
          <button
            onClick={() =>
              setSearchInformation({ term: "", type: "favorites" })
            }
            className="show-favorites"
          >
            Show Favorites &#9733;
          </button>
          <SearchInput search={setSearchInformation} />
          {gistsByUsernameLoading ||
          gistsByIdLoading ||
          favoritedGistsLoading ? (
            <div className="gist-loader">Loading</div>
          ) : (
            <section>
              <GistList
                gists={gists}
                manageShowGistDetails={manageShowGistDetails}
              />
              {gists.length === pageNum * 10 && (
                <button
                  onClick={() => setPageNum(pageNum + 1)}
                  className="see-more-button"
                >
                  See more
                </button>
              )}
            </section>
          )}
        </div>
      ) : (
        <div className="gist-viewer">
          <button
            onClick={() => setShowDetails(false)}
            className="back-to-search"
          >
            Back to search
          </button>
          {detailedGist && <GistDetails gist={detailedGist} />}
        </div>
      )}
    </section>
  );
}

export default GistViewer;
