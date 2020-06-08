import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <ul>
      <li>
        <Link to="/todo-v1">TodoV1</Link>
      </li>
      <li>
        <Link to="/todo-v2">TodoV2</Link>
      </li>
    </ul>
  );
};

export default Home;
