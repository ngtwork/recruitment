import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../../component/navlink/navlink'
import Employer from '../../component/employer/employer'
import Jobseeker from '../../component/jobseeker/jobseeker'
import User from '../user/user'
function Msg(){
    return <h2>Message page</h2>
}

@connect (
    state=>state
)
class Dashboard extends React.Component{
    
    render(){
        const {pathname} = this.props.location
        const user = this.props.user
        const navList = [
            {
                path:'/employer',
                text:'jobseeker',
                icon:'employer',
                title: 'jobseeker list',
                component: Employer,
                hide:user.type=='jobseeker'
            },
            {
                path:'/jobseeker',
                text:'employer',
                icon:'job',
                title: 'employer list',
                component: Jobseeker,
                hide:user.type=='employer'
            },
            {
                path:'/msg',
                text:'message',
                icon:'msg',
                title: 'message list',
                component: Msg,
            },
            {
                path:'/me',
                text:'Me',
                icon:'user',
                title: 'User Info',
                component: User,
            }
        ]
        return(
            <div>
				<NavBar className='fixd-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
				<div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div>

				<NavLinkBar data={navList}></NavLinkBar>
				
			</div>
            
        )
    }

}

export default Dashboard