const express = require("express");
const app = new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
//mongoose.connect('mongodb+srv://userone:userone@fsdfiles.gewcx.mongodb.net/LibraryApp?sretryWrites=true&w=majority', {
    mongoose.connect('mongodb+srv://userone:userone@myfiles.bqvp5.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected")).catch((err) => { console.log(err); })
const methodOverride = require('method-override');
//heroku stuff
const port = process.env.PORT || 5112;

const nav = [
    {
        link: '/home1', name : 'Home'
    },
    
    {
        link: '/books', name: 'Books'
    },
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/admin', name: 'Add Book'
    },
    {
        link: '/addauthor', name: 'Add Author'
    },
    {
        link: '/logout', name: 'Log Out'
    }
];
const nav1 = [
    {
        link: '/home', name : 'Home'
    },
    
    {
        link: '/books1', name: 'Books'
    },
    {
        link: '/authors1', name: 'Authors'
    },
    {
        link: '/logout', name: 'Log Out'
    }
];
const nav2 = [
   

    {
        link: '/login', name: 'Login as User'
    },
    {
        link: '/login1', name: 'Login as Admin'
    },
    {
        link: '/signup', name: 'Sign Up'
    },
    {
        link: '/signup1', name: ''
    }
]
const author1Router=require('./src/routes/author1Router')(nav1);
const books1Router= require('./src/routes/book1Router')(nav1);
const booksRouter = require('./src/routes/bookRoutes')(nav);
const authorRouter = require('./src/routes/authorRouter')(nav);
const adminRouter = require('./src/routes/adminRouter')(nav);
const userRouter = require('./src/routes/userRouter')(nav);
const addauthorRouter =require('./src/routes/addauthorRouter')(nav);
const adminsRouter=require('./src/routes/adminsRouter')(nav);
app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + "/src/views");

app.use('/books1',books1Router);
app.use('/authors1',author1Router);
app.use('/books', booksRouter);     //all exclusively declared routers
app.use('/authors', authorRouter);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/admin', adminRouter);
app.use('/authors/authoredit', adminRouter);
app.use('/addauthor',addauthorRouter);
app.use('/user', userRouter);
app.use('/admins',adminsRouter);
// app.use('/logout', userRouter);

app.get('/', function (req, res) {
    // res.sendFile(__dirname+"/src/views/index.html");
    res.render("login",
        {
            nav2,
            title: 'Library'

        });
});

//SIGN UP ROUTER
app.get('/signup', function (req, res) {
    res.render('signup',
        {
            nav2,
            title: "Signup"
        })
})
// SIGN UP AS ADMIN
app.get('/signup1', function (req, res) {
    res.render('signup1',
        {
            nav2,
            title: "Signup"
        })
})
//LOGIN ROUTER
app.get('/login', (req, res) => {    //using arrow function
    res.render('login',
        {
            nav2,
            title: "Login"
        })
});
// login AS aDMIN
app.get('/login1', (req, res) => {    //using arrow function
    res.render('login1',
        {
            nav2,
            title: "Login"
        })
});
app.get('/home', (req, res) => {    //using arrow function
    res.render('index',
        {
            nav1,
            title: "Home"
        })
});
app.get('/home1', (req, res) => {    //using arrow function
    res.render('index1',
        {
            nav,
            title: "Home"
        })
});


app.get('/logout', (req, res) => {    //using arrow function
    res.render('login',
        {
            nav2,
            title: "Login"
        })
});

app.listen(port, () => { console.log("Server Ready at " + port) });