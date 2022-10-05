const express = require('express')
const fs = require('fs')
const router = express.Router()
router.get('/', (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err) {
            console.log(err)
            data = 'no chat exist'
        }
        res.send(`${data}<form action="/" method="POST" onsubmit="document.getElementById('username').value= localStorage.getItem('username')">
    <input id="message" name="message" type="text" placeHolder="message">
    <input type="hidden" name="username" id="username">
    <button type="submit">Send</button>
    </form>`)
    })
})//flag :a use for append the data
router.post('/', (req, res, next) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username}:${req.body.message}`,{ flag: 'a' }, (err) =>
        err ? console.log(err) : res.redirect("/")
    )
})
module.exports = router