const router = require("express").Router();
const { Blog, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    let blogs = await Blog.findAll();
    blogs = blogs.map((blog) => blog.get({ plain: true }));
    res.render("home", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});