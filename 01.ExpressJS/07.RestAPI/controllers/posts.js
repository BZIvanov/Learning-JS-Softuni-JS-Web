const { validationResult } = require('express-validator/check');
const Post = require('../models/Post');
const User = require('../models/User');

function validatePost(req, res) {
  // errors here are from the middleware validators in routes folder files. The middleware validators with square brackets
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array(),
    });

    return false;
  }

  return true;
}

module.exports = {
  getPosts: (req, res, next) => {
    // Retrieve all posts in JSON format
    Post.find()
      .then((posts) => {
        res.status(200).json({ message: 'Fetched posts successfully.', posts });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        // something important here is that in then, catch, promise, callbacks we need to pass the error to the next function, not just throw the error
        next(error);
      });
  },
  createPost: (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    if (validatePost(req, res)) {
      const { title, content } = req.body;

      // Create the post in DB and return 201 status code with a message and the post itself with the creator
      const post = new Post({ title, content, creator: req.userId });
      let creator;

      post
        .save()
        .then(() => {
          return User.findById(req.userId);
        })
        .then((user) => {
          user.posts.push(post);
          creator = user;
          return user.save();
        })
        .then(() => {
          res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: { userId: req.userId, name: creator.name },
          });
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  },
  deletePost: (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Post not found!');
          error.statusCode = 404;
          // throwing the error will go to catch where with next we will call the global middleware error handler
          throw error;
        }

        if (post.creator.toString() !== req.userId) {
          const error = new Error('Unauthorized');
          error.statusCode = 403;
          throw error;
        }

        return Post.findByIdAndDelete(postId);
      })
      .then(() => {
        return User.findById(req.userId);
      })
      .then((user) => {
        // pull is mongoose method which will find the item and remove it. In this case we will find the id and remove it
        user.posts.pull(postId);
        return user.save();
      })
      .then(() => {
        res.status(200).json({
          message: 'Post deleted successfully!',
        });
      })
      .catch((error) => {
        // if the error thrown from if's above is server error we will go directly here without going throug if's so we need to set status code here
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  getPostById: (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
      .then((post) => {
        res.status(200).json({ message: 'Post fetched.', post });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
  },
  updatePost: (req, res, next) => {
    // Validate post using express-validator
    // Return 422 with errors array if something went wrong
    if (validatePost(req, res)) {
      const postId = req.params.postId;
      const post = req.body;

      Post.findById(postId)
        .then((p) => {
          if (!p) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
          }

          if (p.creator.toString() !== req.userId) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            throw error;
          }

          p.title = post.title;
          p.content = post.content;

          return p.save();
        })
        .then((p) => {
          if (p) {
            res.status(200).json({
              message: 'Post updated!',
              post: p,
            });
          }
        })
        .catch((error) => {
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          next(error);
        });
    }
  },
};
