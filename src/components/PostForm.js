import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../util/hooks";

import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";

export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(error) {},
    variables: values,
  });

  function createPostCallback() {
    createPost();
  }
  return (
    <div>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="Type your shit"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? "Body cannot be empty" : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}
