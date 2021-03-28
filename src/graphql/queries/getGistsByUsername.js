import { gql } from "@apollo/client";

export const getGistsByUsername = gql`
  query getGistsByUsername(
    $username: String!
    $pageNum: Int!
    $maxResults: Int!
  ) {
    getGistsByUsername(
      username: $username
      pageNum: $pageNum
      maxResults: $maxResults
    ) {
      id
      html_url
      created_at
      updated_at
      owner
      description
      avatar_url
      files {
        filename
        type
        language
        raw_url
        size
      }
      favorited
    }
  }
`;
