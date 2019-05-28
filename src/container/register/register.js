import React from 'react'
import Logo from '../../component/logo/logo'
import {List, InputItem, WingBlank, Radio, WhiteSpace, Button} from 'antd-mobile'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { register } from '../../redux/user.redux'
import '../../index.css'

@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'Jobseeker'
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key, val){
        this.setState({
            [key]:val
        })
    }
    handleRegister(){
        this.props.register(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                    <InputItem
                        onChange={v=>this.handleChange('user',v)}
                    >User</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password' 
                        onChange={v=>this.handleChange('pwd',v)}
                    >Password</InputItem>
                    <WhiteSpace />                    
                    <InputItem
                        type='password' 
                        onChange={v=>this.handleChange('repeatpwd',v)}
                    >Confirm Password</InputItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.state.type==='jobseeker'}
                        onChange={()=>this.handleChange('type','jobseeker')}
                    >Jobseeker
                    </RadioItem>
                    <WhiteSpace />
                    <RadioItem 
                        checked={this.state.type==='employer'}
                        onChange={()=>this.handleChange('type','employer')}
                    >Employer
                    </RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>Register</Button>
                </List>
            </div>
        )
    }
}

export default Register;
