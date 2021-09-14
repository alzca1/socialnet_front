import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./context/auth";

import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { Container } from "semantic-ui-react";
import AuthRoute from "./util/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Navbar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/Login" component={Login} />
          <AuthRoute exact path="/Signup" component={Signup} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
