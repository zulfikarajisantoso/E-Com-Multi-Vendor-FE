import React, { Suspense } from "react";
import { Switch, Route, Redirect} from 'react-router-dom'

import { CContainer, CSpinner } from "@coreui/react";
import { Routes2 } from '../routes/Routes'

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {Routes2.map((rout, idx) => {
            return (
              rout.component && (
                <Route
                  key={idx}
                  path={rout.path}
                  exact={rout.exact}
                  name={rout.name}
                  render={(props) => <rout.component {...props} />}
                />
              )
            );
          })}
          <Redirect from="admin" to="/admin/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
