import React, {Suspense} from "react";
import { Route, Redirect } from "react-router-dom";
// 方法
import { getToken } from "../../utils/cookies";
import KeepAlive from 'react-activation'
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// action
const PrivateRouter = ({ component: Component, ...rest }) => {
    let {tabPages, path} = rest;
    let pathArr = Object.keys(tabPages);
    return (
      <Suspense fallback={<div>Loading</div>}>
        <Route {...rest} render={routeProps => (
          getToken() ? pathArr.includes(path) ? <KeepAlive><Component {...routeProps} /></KeepAlive> : <Component {...routeProps} /> : <Redirect to="/" />
        )} />
      </Suspense>
    );
}
const mapStateToProps = (state) => ({
  tabPages: state.tab.tabPages
})

export default connect(
  mapStateToProps,
)(withRouter(PrivateRouter));

