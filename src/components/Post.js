import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { AuthContext } from "../context/auth";

export default function Post({
  post: { body, createdAt, id, likesCount, commentsCount, likes, username },
}) {
  const { user } = useContext(AuthContext);
  console.log("user", user, "username", username);

  const likePost = () => {
    console.log("post liked!");
  };

  const commentPost = () => {
    console.log("commenting post");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="red" pointing="left">
            {likesCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {commentsCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button
            as="div"
            floated="right"
            color="red"
            size="mini"
            as={Link}
            style={{alignSelf: "bottom"}}
            onClick={() => console.log("deleted")}
          >
            <Icon name="trash" color="white" style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
