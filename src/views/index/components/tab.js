import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
// connect
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { edit as editTabPages } from "@/stroe/action/TabPages";
// class 组件
class TabPages extends Component {
    constructor(props){
        super(props); // 初始化默认值 
    }
    checkTab = (key, title) => {
        return () => {
            let {tab, actions, history} = this.props;
            tab[key] = {checked: true, title: title};
            for (let tabKey in tab) {
                if (tabKey !== key) tab[tabKey].checked = false;
            }
            history.push(key)
            actions.editTabPages(tab)
        }
    }
    delTab = (key) => {
        return () => {
            let {tab, actions, location, history} = this.props;
            delete tab[key]
            if (location.pathname === key) {
                history.go(-1)
            }
            actions.editTabPages(tab)
        }
    }
    render(){
        const { tab } = this.props;
        return (
            <div>
                {
                    Object.keys(tab).map(val => {
                        return (
                            <div key={val}>
                                <span onClick={this.checkTab(val, tab[val].title)}>{tab[val].title}</span>
                                <span onClick={this.delTab(val)}>X</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    tab: state.tab.tabPages,
})

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            editTabPages
        }, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(TabPages));