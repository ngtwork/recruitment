const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const _filter = {'pwd':0, '__v':0}

Router.get('/list', function(req,res){
    const {type} = req.query
    //remove all the users
    // User.remove({}, function(e,d){})
    User.find({type},function(err, doc){
        return res.json({code:0, data:doc})
    })
})

Router.post('/update', function(req,res){
    const userid = req.cookies.userid
    if(!userid) {
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0, data})
    })
})

Router.post('/login', function(req,res){
    const {user, pwd} = req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter, function(err,doc){
        if(!doc) {
            console.log(md5Pwd(pwd))
            return res.json({code:1,msg:'user or password not correct'})
        }
        res.cookie('userid', doc._id)
        return res.json({code:0, data:doc})
    })
})
Router.post('/register',function(req, res){
    console.log(req.body.data)
    const {user, pwd, type} = req.body
    User.findOne({user:user}, function(err,doc){
        if(doc) {
            return res.json({code:1, msg:'User name exists'})
        }

        const userModel = new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(e,d){
            if (e) {
                return res.json({code:1,msg:'something wrong'})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code:0, data:{user, type, _id}})

        })
       
    })
})

Router.get('./info', function(req, res){
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({_id:userid}, _filter, function(err,doc){
        if (err) {
            return res.json({code:1, msg:'something wrong'})
        }
        if (doc) {
            return res.json({code:0, data:doc})
        }
    })
})

function md5Pwd(pwd){
    const salt = 'imooc_is_goodkjsbdcoef8472847-=##kuds'
    return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router