import React from 'react';
import { Switch } from 'react-router-dom';
// 私有组件方法
import PrivateRouter from "../privateRouter/Index";
/** 自动化工程 */
import Components from "./components";
import {
  Provider,
} from 'react-keep-alive';
class ContainerMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return (
        <Provider>
          <Switch>
            {
              Components.map(item => {
                return <PrivateRouter exact key={item.path} path={item.path} component={item.component} />
              })
            }
          </Switch>
        </Provider>
    )
  }
}
export default ContainerMain;