import gql from "graphql-tag";

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      # user
      likes {
        id
        username
        createdAt
      }
      likesCount
      commentsCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      username
      likesCount
      commentsCount
      likes {
        id
        username
        createdAt
      }
      comments {
        body
        username
        likes {
          id
          username
          createdAt
        }
      }
    }
  }
`;
