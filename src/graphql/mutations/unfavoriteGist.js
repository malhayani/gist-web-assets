import { gql } from "@apollo/client";

export const unfavoriteGist = gql`
  mutation unfavoriteGist($id: ID!) {
    unfavoriteGist(id: $id) {
      id
      favorited
    }
  }
`;
