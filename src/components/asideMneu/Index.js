import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
// icon
import { UserOutlined } from '@ant-design/icons';
// antd
import { Menu } from "antd";
// connect
import { connect } from "react-redux";
// action
//action
import { getUserRoleAction } from "@/stroe/action/App";
import { edit as editTabPages } from "@/stroe/action/TabPages";
import { changeMenu, changeKeys } from "@/stroe/action/Menu";
const { SubMenu } = Menu;

class AsideMenu extends Component {
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount(){
        this.props.headnlerUserRole();
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
        let {tab: {tabPages}, editTabPages, history} = this.props;
        let newTabPages = {...tabPages, [key]: {checked: true, title: item.node.outerText}};
        for (let tabKey in newTabPages) {
            if (tabKey !== key) newTabPages[tabKey].checked = false;
        }
        editTabPages(newTabPages)
        history.push(key)
        // 添加页签逻辑--------------end-----------------
        const menuHigh = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length - 1]// 数组的长度减1，即是数组的最后一项
        }
        this.selectMenuHigh(menuHigh);
    }
    openMenu = (openKeys) => {
        this.props.changeKeys([openKeys[openKeys.length - 1]]);
    }

    /** 菜单高光 */
    selectMenuHigh = ({selectedKeys, openKeys}) => {
        this.props.changeMenu({
            selectedKeys: [selectedKeys],
            openKeys: [openKeys]
        });
    }


    // 无子级菜单处理
    renderMenu = ({title, key}) => {
        return (
            <Menu.Item key={key}>
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

    render () {
        const {app: {routers}, menu: {selectedKeys, openKeys}} = this.props;
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

export default connect(
    state => state,
    {
        headnlerUserRole: getUserRoleAction,
        changeMenu,
        changeKeys,
        editTabPages
    }
)(withRouter(AsideMenu));

