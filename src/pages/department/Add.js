import React, { Component, Fragment } from "react";
// antd
import { Button, message } from "antd";
// API
import { Add, Detailed, Edit } from "@/server/department";
// 组件
import FormCom from "@c/form/Index";
import { connect } from "react-redux";
import { del as delTabPages } from "@/store/action/TabPages";
import { withAliveScope } from 'react-activation'
// class 组件
@withAliveScope
class DepartmentAdd extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            id: "",
            formConfig: {
                url: "departmentAdd",
                initValue: {
                    number: 0,
                    status: true
                },
                setFieldValue: {}
            },
            formLayout: {
                labelCol: { span: 2 },
                wrapperCol: { span: 20 }
            },
            formItem: [
                { 
                    type: "Input",
                    label: "部门名称", 
                    name: "name", 
                    required: true, 
                    style: { width: "200px" },
                    placeholder: "请输入部门名称"
                },
                { 
                    type: "InputNumber",
                    label: "人员数量", 
                    name: "number", 
                    required: true, 
                    min: 0,
                    max: 100,
                    style: { width: "200px" },
                    placeholder: "请输入人员数量"
                },
                { 
                    type: "Radio",
                    label: "禁启用", 
                    name: "status", 
                    required: true,
                    options: [
                        { label: "禁用", value: false },
                        { label: "启用", value: true },
                    ]
                },
                { 
                    type: "Input",
                    label: "描述", 
                    name: "content", 
                    required: true, 
                    placeholder: "请输入描述内容"
                }
            ]
        };
    }

    componentWillMount(){
        if(this.props.location.state) {
            this.setState({
                id: this.props.location.state.id
            })
        }
    }

    componentDidMount(){
        this.getDetailed();
    }

    getDetailed = () => {
        if(!this.props.location.state) { return false }
        Detailed({id: this.state.id}).then(response => {
            this.setState({
                formConfig: {
                    ...this.state.formConfig,
                    setFieldValue: response.data.data
                }
            })
            // this.refs.form.setFieldsValue(response.data.data);
        })
    }
    /** 编辑信息 */
    onHandlerEdit = (value) => {
        const requestData = value;
        requestData.id = this.state.id;
        Edit(requestData).then(response => {
            console.log(response.data)
            const data = response.data;
            message.info(data.message)
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }
    /** 添加信息 */
    onHandlerAdd = (value) => {
        const requestData = value;
        Add(requestData).then(response => {
            const data = response.data;
            message.info(data.message)
            this.setState({
                loading: false
            })
        }).catch(error => {
            this.setState({
                loading: false
            })
        })
    }
    /** 提交表单 */
    onHandlerSubmit = (value) => {
        this.state.id ? this.onHandlerEdit(value) : this.onHandlerAdd(value);
    }
    jump = () => {
        let {delTabPages, history, drop} = this.props;
        delTabPages({key: '/index/department/add', toKey: '/index/department/list'});
        drop('/index/department/add');
        history.push('/index/department/list')
    }
    render(){
        console.log('添加部门', this.props)
        return (
            <Fragment>
                <FormCom formItem={this.state.formItem} formLayout={this.state.formLayout} formConfig={this.state.formConfig} submit={this.onHandlerSubmit} />
                <Button onClick={this.jump}>关闭</Button>
            </Fragment>
        )
    }
}
export default connect(
    state => state,
    {
        delTabPages
    }
)(DepartmentAdd);