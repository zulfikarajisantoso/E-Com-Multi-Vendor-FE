import React, { useState, useEffect, Suspense } from "react";
import { CContainer, CSpinner } from "@coreui/react";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import { useHistory, Route, Redirect } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import navigation from '../_nav'

const DefaultLayout = ({ ...rest }) => {
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
        b;
      } catch (error) {
        console.error("Error in second API request:", error);
      }

      // If both requests fail, handle the error
      swal("forbidden", "Both API requests failed", "warning");
      history.push("/404");
    };

    fetchData();
  }, []);


  if(loading) {
    return  <div className="w-100 justify-content-center align-items-center d-flex" style={{minHeight:"100vh"}}>
      <CSpinner color="primary" />
    </div>
  }

  return (
    <>
      <Route
        {...rest}
        render={({ props, location }) => {
          if (auth) {
            return (
              <div>
                <AppSidebar navigation={navigation} />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                  <AppHeader />
                  <div className="body flex-grow-1 px-3">
                    <AppContent />
                  </div>
                  <AppFooter />
                </div>
              </div>
            );
          } else if (authSuper) {
            return (
              <div>
                <AppSidebar navigation={navigation} />
                <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                  <AppHeader />
                  <div className="body flex-grow-1 px-3">
                    <AppContent />
                  </div>
                  <AppFooter />
                </div>
              </div>
            );
          } else {
            return (
              <Redirect
                to={{ pathname: "/", state: { from: location } }}
              />
            );
          }
        }}
      />
    </>
  );
};

export default DefaultLayout;
