import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import TodoV2 from "./pages/TodoV2";
import Home from "./pages/Home";
import Customer from "./pages/Customer";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/todo-v1">
          <Todo title="Todo" version={1} />
        </Route>
        <Route path="/todo-v2">
          <TodoV2 title="Todo" version={2} />
        </Route>
        <Route path="/customer">
          <Customer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
