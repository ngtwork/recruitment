import axios from "axios"
import {getRedirectPath} from '../util'


const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const initState={
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}
export function user(state=initState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state, msg:'', redirectTo:getRedirectPath(action.payload), ...action.payload}
        case LOAD_DATA:
            return {...state, ...action.payload}
        case ERROR_MSG:
            return{...state, isAuth:false, msg:action.msg}
        default:
            return state
    }
}
function authSuccess(obj){
    const {pwd,...data} = obj
    return {type:AUTH_SUCCESS, payload:data}
}
function errorMsg(msg){
    return {msg, type:ERROR_MSG}
}

export function loadData(userinfo){
    return { type:LOAD_DATA, payload:userinfo}
}

export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data)
            .then(res=>{
                if (res.status==200 && res.data.code===0) {
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}
export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg('please enter user name or password')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
            if (res.status==200 && res.data.code===0) {
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register({user,pwd,repeatpwd,type}) {
    if(!user || !pwd || !type) {
        return errorMsg('no user name or password')
    }
    if(pwd!==repeatpwd) {
        return errorMsg('password not the same')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type})
        .then(res=>{
            if (res.status==200 && res.data.code===0) {
                dispatch(authSuccess({user,pwd,type}))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
    
}