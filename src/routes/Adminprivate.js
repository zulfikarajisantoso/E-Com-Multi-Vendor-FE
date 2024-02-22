import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import swal from "sweetalert";
import Masterlayout from "../layouts/admin/Masterlayout";
import MasterlayoutSuper from "../layouts/admin/MasterlayoutSuper";

function Adminprivate({ ...rest }) {
  const history = useHistory();
  const [auth, setauth] = useState(false);
  const [authSuper, setauthSuper] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make your API request here
        const response = await axios.get("/api/checkingauthadmin");

        if (response.status === 200) {
          setauth(true);
          setloading(false);
          return; // Exit early if the first request is successful
        }
      } catch (error) {
        console.error("Error in first API request:", error);
      }

      try {
        // Make the second API request if the first one failed
        const response2 = await axios.get("/api/checkingauthsuperadmin");

        if (response2.status === 200) {
          setauthSuper(true);
          setloading(false);
          return; // Exit early if the second request is successful
        }
      } catch (error) {
        console.error("Error in second API request:", error);
      }

      // If both requests fail, handle the error
      swal("forbidden", "Both API requests failed", "warning");
      history.push("/404");
    };

    fetchData();
  }, []);

  //   axios.interceptors.response.use(
  //     undefined,
  //     function axiosRetryInterceptor(err) {
  //       if (err.response.status === 401) {
  //         swal("Unauthorized ", err.response.data.message, "warning");
  //         history.push("/");
  //       }
  //       return Promise.reject(err);
  //     }
  //   );

  //   axios.interceptors.response.use(
  //     function (response) {
  //       return response;
  //     },
  //     function (error) {
  //       try {
  //         if (error.response.status === 403) {
  //           //access denied
  //           swal("forbidden", error.response.data.message, "warning");
  //           history.push("/404");
  //         } else if (error.response.status === 404) {
  //           //page not found
  //           swal("403 Error", "Url/page not found", "warning");
  //           history.push("/402");
  //         }
  //         return Promise.reject(error);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   );

  console.log(auth);
  console.log(authSuper);

  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (
    <Route
      {...rest}
      render={({ props, location }) => {
        if (auth) {
          return <Masterlayout {...props} />;
        } else if (authSuper) {
          return <MasterlayoutSuper {...props} />;
        } else {
          return (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          );
        }
      }}
    />
  );
}

export default Adminprivate;
