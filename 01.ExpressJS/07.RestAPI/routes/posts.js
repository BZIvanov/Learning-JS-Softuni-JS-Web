const router = require('express').Router();
const { body } = require('express-validator/check');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
} = require('../controllers/posts');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, getPosts);
router.get('/:postId', isAuth, getPostById);
router.post(
  '/',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 }),
  ],
  createPost
);
router.put('/:postId', isAuth, updatePost);
router.delete('/:postId', isAuth, deletePost);

module.exports = router;
