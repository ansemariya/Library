const express = require('express');
const AdminData = require('../model/adminData');

const adminsRouter= express.Router();
const nav3 = [
    {
        link: '/login', name: 'Login'
    },
    {
        link: '/signup', name: 'Sign Up'
    }
]

function router(nav) {
adminsRouter.post('/signup1', function (req, res) {
    const item = {
        // fname: req.body.fname,
        // lname: req.body.lname,
        username: req.body.username,
        password: req.body.password
    }
    const admin = AdminData(item)
    admin.save()
    res.redirect('/home1');
})
adminsRouter.post('/login1', async (req, res) => {
try {
    const admin = await AdminData.findByCredentials(req.body.username, req.body.password)
    return res.redirect('/home1')
} catch (err) {
    res.status(400).render("error", {
        nav3,
        title: "Error 400",
        error: "Access Denied",
        message: err
    })
}
})
return adminsRouter;
}

module.exports = router;