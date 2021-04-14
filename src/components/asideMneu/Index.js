import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// icon
import { UserOutlined } from '@ant-design/icons';
// antd
import { Menu } from "antd";
// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action
//action
import { getUserRoleAction } from "@/stroe/action/App";
import { edit as editTabPages } from "@/stroe/action/TabPages";
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedKeys: [],
            openKeys: []
        };
    }

    UNSAFE_componentWillMount(){
        this.props.actions.headnlerUserRole();
    }
    
    // 生命周期，在这里多了一层接口请求，并过滤路由
    componentDidMount(){
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split("/").slice(0, 3).join('/');
        const menuHigh = {
            selectedKeys: pathname,
            openKeys: menuKey
        }
        this.selectMenuHigh(menuHigh);
    }

    /** 选择菜单  */
    selectMenu = ({item, key, keyPath}) => {
        // 添加页签逻辑-----------start---------------
        // this.props.history.push(key);
        let {tabPages, actions, history} = this.props;
        tabPages[key] = {checked: true, title: item.node.outerText};
        for (let tabKey in tabPages) {
            if (tabKey !== key) tabPages[tabKey].checked = false;
        }
        actions.editTabPages(tabPages)
        history.push(key)
        // 添加页签逻辑--------------end-----------------
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]// 数组的长度减1，即是数组的最后一项
        }
        this.selectMenuHigh(menuHigh);
    }
    openMenu = (openKeys) => {
        this.setState({
            openKeys: [openKeys[openKeys.length - 1]]
        })
    }

    /** 菜单高光 */
    selectMenuHigh = ({selectedKeys, openKeys}) => {
        this.setState({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        })
    }


    // 无子级菜单处理
    renderMenu = ({title, key}) => {
        return (
            <Menu.Item key={key}>
                {/* <Link to={key}><span>{title}</span></Link> */}
                <span>{title}</span>
            </Menu.Item>
        )
    }

    // 子级菜单处理
    renderSubMenu = ({title, key, child}) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {
                    child && child.map(item => {
                        return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
                    })
                }
            </SubMenu>
        )
    }

    render(){
        const { selectedKeys, openKeys } = this.state;
        const { routers } = this.props;
        return (
            <Fragment>
                <Menu
                onOpenChange={this.openMenu}
                onClick={this.selectMenu}
                theme="dark"
                mode="inline"
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        routers && routers.map(firstItem => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem);
                        })
                    }
                </Menu>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    routers: state.app.rotuers,
    tabPages: state.tab.tabPages
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            headnlerUserRole: getUserRoleAction,
            editTabPages
        }, dispatch)

    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AsideMenu));

