import React, { Component, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./scss/style.scss";
import axios from "axios";
import GlobalpublicRoute from "./GlobalpublicRoute";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import DefaultLayout from "./layout/DefaultLayout";
import Login from "./components/front/auth/Login";
import Regis from "./components/front/auth/Regis";
// Containers
// const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// // Pages
// const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.baseURL = "https://backstoraja.herokuapp.com/"
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
});

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Suspense fallback={loading}> */}
        <Switch>
          <DefaultLayout path="/admin" name="Admin" />
          <Route path="/login">
            <Login />
          </Route>
       
          <Route path="/register">
            <Regis /> 
          </Route>
       
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          <GlobalpublicRoute path="/" name="Home" />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Switch>
        {/* </Suspense> */}
      </Router>
    );
  }
}

export default App;
