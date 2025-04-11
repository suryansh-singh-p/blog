const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth')

router.get('/', (req, res, next) => {
    Blog.find()
        .then(result => {
            console.log(result)
            res.status(200).json({
                blogData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

router.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(result => {
            res.status(200).json({
                blogData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});
router.put('/:id', checkAuth, (req, res, next) => {
    console.log(req.params.id);
    Blog.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            blogtitle: req.body.blogtitle,
            blogbody: req.body.blogbody,
            blogauthor: req.body.blogauthor
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_blog: result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500)
    })
});
router.post('/', checkAuth, (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId,
        blogtitle: req.body.blogtitle,
        blogbody: req.body.blogbody,
        blogauthor: req.body.blogauthor
    })

    blog.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newBlog: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:id', checkAuth, (req, res, next) => {
    Blog.deleteOne({ _id: req.params.id })
        .then(result => {
            res.status(200).json({
                message: 'Blog Deleted',
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;