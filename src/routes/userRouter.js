const express = require('express');
const userData = require('../model/userData');

const userRouter = express.Router();
const adminsRouter= express.Router();
const nav3 = [
    {
        link: '/login', name: 'Login'
    },
    {
        link: '/signup', name: 'Sign Up'
    }
]
function router(nav1) {
    userRouter.post('/signup', function (req, res) {
        const item = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        }
        const user = userData(item)
        user.save()
        res.redirect('/home');
    })

    userRouter.post('/login', async (req, res) => {
        try {
            const user = await userData.findByCredentials(req.body.email, req.body.password)
            return res.redirect('/home')
        } catch (err) {
            res.status(400).render("error", {
                nav3,
                title: "Error 400",
                error: "Access Denied",
                message: err
            })
        }
    })
    return userRouter;
}
// router for Admin
// function router(nav1) {
// adminsRouter.post('/signup1', function (req, res) {
//     const item = {
//         // fname: req.body.fname,
//         // lname: req.body.lname,
//         username: req.body.username,
//         password: req.body.password
//     }
//     const admin = AdminData(item)
//     admin.save()
//     res.redirect('/home');
// })
// adminsRouter.post('/login1', async (req, res) => {
// try {
//     const admin = await AdminData.findByCredentials(req.body.username, req.body.password)
//     return res.redirect('/home')
// } catch (err) {
//     res.status(400).render("error", {
//         nav3,
//         title: "Error 400",
//         error: "Access Denied",
//         message: err
//     })
// }
// })
// return adminsRouter;
// }

module.exports = router;