import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
// connect
import { connect } from "react-redux";
import { edit as editTabPages } from "@/store/action/TabPages";
import { changeMenu } from "@/store/action/Menu";
import { withAliveScope } from 'react-activation'
// class 组件
@withAliveScope
class TabPages extends Component {
    constructor(props){
        super(props); // 初始化默认值
        let {editTabPages} = this.props;
        let pagesStr = sessionStorage.getItem('tab-pages');
        editTabPages(JSON.parse(pagesStr));
    }
    checkTab = (key, title) => {
        return () => {
            let {tab, editTabPages, history, changeMenu} = this.props;
            let pages = {...tab.tabPages};
            pages[key] = {checked: true, title: title};
            for (let tabKey in pages) {
                if (tabKey !== key) pages[tabKey].checked = false;
            }
            history.push(key)
            changeMenu({selectedKeys: [key], openKeys: [key.split("/").slice(0, 3).join('/')]});
            editTabPages(pages)
        }
    }
    delTab = (key) => {
        return () => {
            const { drop } = this.props;
            let {tab, editTabPages, location, history, changeMenu} = this.props;
            let pages = {...tab.tabPages};
            delete pages[key];
            drop(key);
            if (location.pathname === key) {
                history.go(-1);
                setTimeout(() => {
                    const {pathname} = this.props.location;
                    for (let tabKey in pages) {
                        pages[tabKey].checked = tabKey === pathname;
                    }
                    changeMenu({selectedKeys: [pathname], openKeys: [pathname.split("/").slice(0, 3).join('/')]});
                    editTabPages(pages);
                    console.log('this.props', this.props)
                }, 50)
                return;
            }
            editTabPages(pages);
            console.log('this.props222', this.props)
        }
    }
    render(){
        const { tab } = this.props;
        return (
            <div>
                {
                    Object.keys(tab.tabPages).map(val => {
                        return (
                            <div key={val}>
                                <span onClick={this.checkTab(val, tab.tabPages[val].title)} style={{color: tab.tabPages[val].checked ? 'red' : 'grey'}}>{tab.tabPages[val].title}</span>
                                <span onClick={this.delTab(val)}>X</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    state => state,
    {
        editTabPages,
        changeMenu
    }
)(withRouter(TabPages));