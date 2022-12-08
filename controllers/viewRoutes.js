const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const auth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    let blogs = await Blog.findAll();
    blogs = blogs.map((blog) => blog.get({ plain: true }));
    res.render("homepage", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", auth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    let blogs = await Blog.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: User,
    });
    blogs = blogs.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      url: req.originalUrl,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  res.render("login");
});

module.exports = router;
