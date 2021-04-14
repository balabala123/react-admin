import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// 引用组件
import Login from './views/login/Index';
import Index from './views/index/Index';
// 私有组件方法
import PrivateRouter from "./components/privateRouter/Index";
// store
import Store from "@/stroe/Index";
// Provider
import { Provider } from "react-redux";
import {AliveScope} from 'react-activation'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
      <AliveScope>
      <Provider store={Store}>
        <BrowserRouter>
          <Switch>
            <Route exact component={Login} path="/" />
            <PrivateRouter component={Index} path="/index" />
          </Switch>
        </BrowserRouter>
      </Provider>
      </AliveScope>
    )
  }
}

export default App;
