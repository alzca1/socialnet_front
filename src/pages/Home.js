import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import Post from "../components/Post";
const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      user
      likesCount
      commentsCount
      likes {
        id
      }
      comments {
        body
        username
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row centered className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column>
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
