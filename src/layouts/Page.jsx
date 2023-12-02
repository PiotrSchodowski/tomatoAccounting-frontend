import React from "react";
import { Route, Switch } from "react-router-dom";

import LoginPages from "../pages/LoginPage";
import RegisterPages from "../pages/RegisterPage";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Products from "../pages/Products";

const Page = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginPages} />
      <Route path="/register" component={RegisterPages} />
      <Route path="/products" component={Products} />
      <Route component={ErrorPage} />
    </Switch>
  );
};

export default Page;
