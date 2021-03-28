import React, { useState } from "react";
import "./index.css";

// Search component
export const SearchInput = ({ search }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("username");

  return (
    <section className="search-container">
      <section className="search-input-container">
        <input
          type="text"
          placeholder="Search gists..."
          value={searchTerm}
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="search-button"
          onClick={() =>
            search({ term: searchTerm, type: searchType, pageNum: 1 })
          }
        >
          <span className="search-icon" aria-label="search">
            &#9906;
          </span>
        </button>
      </section>
      <section className="search-type-container">
        <section className="search-type-label">Search by:</section>
        <section className="search-type-input">
          <input
            type="radio"
            id="username"
            name="searchType"
            value="username"
            checked={searchType === "username"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <label htmlFor="username">username</label>
        </section>
        <section className="search-type-input">
          <input
            type="radio"
            id="id"
            name="searchType"
            value="id"
            checked={searchType === "id"}
            onChange={(e) => setSearchType(e.target.value)}
          />
          <label htmlFor="id">id</label>
        </section>
      </section>
    </section>
  );
};
