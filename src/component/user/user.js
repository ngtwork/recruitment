import React from 'react'
import { connect } from 'react-redux'
import {Result, List, WhiteSpace, Modal, Button} from 'antd-mobile'
import { Brief } from 'antd-mobile/lib/list/ListItem';
import browserCookie from 'browser-cookies'

@connect (
    state=>state.user
)


class User extends React.Component{
    constructor(props){
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout(){
        const alert = Modal.alert
        alert('Log out', 'Are you sure??', [
            { text: 'NO', onPress: () => console.log('cancle')},
            { text: 'YES', onPress: () => {
                browserCookie.erase('userid')
                window.location.href = window.location.href
            }},
        ])
    }
    render() {
        const props=this.props
        const Item=List.Item
        const Brief = List.Item.Brief
        console.log(this.props)
        return props.user?(
            <div>
                <Result 
                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
                    title={this.props.user}
                    message={props.type=='employer'?props.company:null}
                />
                <List renderHeader={()=>'description'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        {props.salary?<Brief>Salary: {props.salary}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item>
                        <Button onClick={this.logout}>Log out</Button>
                    </Item>
                </List>
            </div>
        ):null
    }
}


export default User