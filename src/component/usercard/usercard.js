import React from 'react'
import {Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'

class UserCard extends React.Component {
    static propTypes = {
        userlist:PropTypes.array.isRequired
    }
    render(){
        return(
            <WingBlank> 
            <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v=>(
                    v.avatar?(<Card key={v._id}>
                        <Card.Header 
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.type=='employer'? <div>Company: {v.company}</div> :null}
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type=='employer'? <div>salary: {v.salary}</div> :null}
                        </Card.Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard