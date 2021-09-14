import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../util/hooks";

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInfo: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      createdAt
    }
  }
`;

export default function Signup(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(submitUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log("result", result);
      props.history.push("/");
    },
    onError(error) {
      console.log(values)
      console.log(error.graphQLErrors)
      const graphqlErr = error.graphQLErrors[0].extensions.errors;
      console.log("errores", error.graphQLErrors[0]);
      setErrors(graphqlErr);
    },
    variables: values,
  });

  function submitUser() {
    addUser();
  }

  return (
    <div>
      <Form error onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Signup</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
          error={errors.email}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password" 
          value={values.password}
          onChange={onChange}
          type="password"
          error={errors.password}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm password..."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
          error={errors.confirmPassword}
        />
        <Button type="submit" primary>
          Signup
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
  );
}
