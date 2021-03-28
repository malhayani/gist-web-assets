import { gql } from "@apollo/client";

export const favoriteGist = gql`
  mutation favoriteGist($id: ID!) {
    favoriteGist(id: $id) {
      id
      favorited
    }
  }
`;
