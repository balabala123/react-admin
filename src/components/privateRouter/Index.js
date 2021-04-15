import React, {Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
// 方法
import { getToken } from "../../utils/cookies";
import KeepAlive from 'react-activation'
// action
const PrivateRouter = ({ component: Component, ...rest }) => {
    let {path} = rest;
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Route {...rest} render={routeProps => (
          getToken() ? <KeepAlive name={path}><Component {...routeProps} /></KeepAlive> : <Redirect to="/" />
        )} />
      </Suspense>
    );
}

export default PrivateRouter;

