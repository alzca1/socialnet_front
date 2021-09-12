import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function Navbar() {
    const path = window.location.pathname; 
    const pathname = path === "/" ? "home": path.substr(1)
  const [activeItem, setActiveItem] = useState(pathname);

  const handleClick = (e, { name }) => setActiveItem(name);

  return (
    <div>
      <Menu pointing secondary size="large" color="blue">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleClick}
          as={Link}
          to="/"
        />

        <Menu.Item
          name="signup"
          active={activeItem === "signup"}
          onClick={handleClick}
          as={Link}
          to="/signup"
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={handleClick}
            as={Link}
            to="/logout"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
}
