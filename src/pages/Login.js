import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInfo: { username: $username, password: $password }) {
      id
      email
      token
      username
    }
  }
`;

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(submitUser, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(error) {
      const graphqlError = error.graphQLErrors[0].extensions.errors;
      setErrors(graphqlError);
    },
    variables: values,
  });

  function submitUser() {
    loginUser();
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
          error
        >
          <h1>Login</h1>
          <Form.Input
            label="Username"
            placeholder="Username..."
            name="username"
            value={values.username}
            onChange={onChange}
          />
          <Form.Input
            label="Password"
            placeholder="Password..."
            name="password"
            value={values.password}
            onChange={onChange}
            type="password"
          />
          <Button type="submit" primary>
            Login
          </Button>
          {Object.keys(errors).length > 0 && (
            <div className="ui error form message">
              <ul className="list">
                {Object.values(errors).map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
