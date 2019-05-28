import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'

import Login from './container/login/login'
import Register from './container/register/register'
import EmployerInfo from './container/employerinfo/employerinfo'
import JobseekerInfo from './container/jobseekerinfo/jobseekerinfo'
import Dashboard from './component/dashboard/dashboard'
import AuthRoute from './component/authroute/authroute'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))


ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/jobseekerinfo" component={JobseekerInfo} />
                    <Route path="/employerinfo" component={EmployerInfo} />
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/register" component={Register}></Route>

                    <Route component={Dashboard}></Route>
                </Switch>
                
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)