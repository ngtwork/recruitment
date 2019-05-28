import React from 'react'
import axios from 'axios'
import UserCard from '../usercard/usercard'
import {getUserList} from '../../redux/charuser.redux'
import { connect } from 'react-redux';


@connect(
    state=>state.chatuser,
    {getUserList}
)
class Jobseeker extends React.Component{
    componentDidMount() {
       this.props.getUserList('employer')
    }
    render(){

        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default Jobseeker