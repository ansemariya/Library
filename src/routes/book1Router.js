const express = require("express");
const books1Router = express.Router(); //creating a separate router for books using express router class
const BookData = require('../model/bookData')
function router(nav1) {
    // var books = [
    //     {
    //         title: 'Oliver Twist',
    //         author: 'Charles Dickens',
    //         genre: 'Fiction',
    //         img: "oliver.jpg"
    //     },

    //     {
    //         title: 'Tale of Two Cities',
    //         author: 'Charles Dickens',
    //         genre: 'Fiction',
    //         img: "tale.jpg"
    //     },

    //     {
    //         title: 'Pride and Prejudice',
    //         author: 'Jane Austin',
    //         genre: 'Fiction',
    //         img: "pride.jpg"
    //     },

    //     {
    //         title: 'Little Women',
    //         author: 'Louisa May Alcott',
    //         genre: 'Fiction',
    //         img: "little.jpg"
    //     },

    //     {
    //         title: 'Wings of Fire',
    //         author: 'APJ Abdul Kalam & Arun Tiwari',
    //         genre: 'Autobiography',
    //         img: "wings.jpg"
    //     }

    // ]
    books1Router.get('/', function (req, res) { // / is used for root page
        BookData.find()
            .then(function (books) {
                res.render("books1",
                    {
                        nav1,
                        title: 'Library',
                        books
                    });
            });

    });

    //accessing url characters using :
    books1Router.get('/:indx', function (req, res) {
        const id = req.params.indx;
        BookData.findOne({ _id: id })
            .then(function (book) {
                res.render('book1',
                    {
                        nav1,
                        title: 'Book',
                        book
                        // book:books[id]  //key:value pair
                    })
            }).catch((err) => res.render("error", {
                nav1,
                title: "Error 500",
                error: "Internal Server Error",
                message: err

            }));
    })

    return books1Router;

}

module.exports = router;