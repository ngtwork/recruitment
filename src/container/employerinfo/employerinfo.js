import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)
class EmployerInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            desc:'',
            company:'',
            salary:''
        }
    }

    onChange(key, val){
        this.setState({
            [key]:val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark">Employer complete info</NavBar>
                <AvatarSelector
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('title',v)}>
                    Job Title
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company',v)}>
                    Company Name
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('salary',v)}>
                    Job Salary
                </InputItem>
                <TextareaItem 
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                    title='Job Description'
                >
                </TextareaItem>
                <Button
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type='primary'>SAVE</Button>
            </div>
        )
    }
}

export default EmployerInfo