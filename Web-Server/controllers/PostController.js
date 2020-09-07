const { Post, User, Role } = require('../models/index');
const { Op } = require('sequelize');

class PostController {
  //  Get All posts
  async getAllPost(req, res) {
    try {
      const post = await Post.findAll({ include: User });
      res.status(200).send(post);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //  get Post By Id in url address
  async getPostById(req, res) {
    try {
      const postId = req.params.postId;

      const post = await Post.findByPk(postId, { include: User });
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send("Couldn't find anything.");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //  Create new post if user Auth
  async storePost(req, res) {
    try {
      const userId = req.user.user.id;

      const post = await Post.create({
        title: req.body.title,
        content: req.body.content,
        userId: userId,
      });

      res.status(201).send(post);
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //  Update post if it belongs to User or roleId === 1 (Admin)
  async updatePost(req, res) {
    try {
      const userId = req.user.user.id;
      const postId = req.params.postId;

      const post = await Post.findByPk(postId, {
        include: User,
      });
      const user = await User.findOne({ where: { id: userId } });

      if (user.roleId === 1 || post.userId === userId) {
        await post.update(req.body);

        res.status(200).json(post);
      } else {
        res
          .status(404)
          .send(
            'The following action is unavailable at the moment! Please ensure this is your post and that it still exists'
          );
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }

  //  Update post if it belongs to User or role.name === Admin
  async deletePost(req, res) {
    try {
      const userId = req.user.user.id;
      const postId = req.params.postId;

      const post = await Post.findByPk(postId, {
        include: User,
      });
      const user = await User.findOne({ where: { id: userId } });

      if (user.roleId === 1 || post.userId === userId) {
        await post.destroy();

        res.status(200).json('You will no longer see this post');
      } else {
        res
          .status(404)
          .send(
            'The following action is unavailable at the moment! Please ensure this is your post and that it still exists'
          );
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports = new PostController();
