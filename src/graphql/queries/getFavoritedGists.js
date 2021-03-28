import { gql } from "@apollo/client";

export const getFavoritedGists = gql`
  query getFavoritedGists {
    getFavoritedGists {
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
