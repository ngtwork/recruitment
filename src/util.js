import { user } from "./redux/user.redux";


export function getRedirectPath({type, avatar}) {
    let url = (type==='jobseeker')?'/jobseeker': '/employer'
    if (!avatar) {
        url += 'info'
    }
    return url
}   