const User = require('../models/User');
const Thread = require('../models/Thread');
const Message = require('../models/Message');

module.exports = {
  // async and awaits must always be wrapped in try catch block in case of error
  findUser: async (req, res) => {
    try {
      let currentUser = req.user;
      let otherUser = await User.findOne({
        username: req.body.username,
      });
      let otherUserUsername = req.body.username;

      if (otherUser) {
        let targetThread = await Thread.find({
          users: { $all: [currentUser._id, otherUser._id] },
        });

        if (targetThread.length > 0) {
          let targetThreadId = targetThread[0].id.toString();
          let messages = await Message.find({ thread: targetThreadId });

          messages = messages.map((x) => {
            if (x.user.toString() === currentUser.id.toString()) {
              x.direction = 'right';
            } else {
              x.direction = 'left';
            }

            if (
              x.content.startsWith('http://') ||
              x.content.startsWith('https://')
            ) {
              x.isImage = true;
            } else {
              x.isImage = false;
            }

            return x;
          });
          console.log(messages);

          res.render('thread/chat', {
            otherUserUsername,
            messages,
            targetThreadId,
          });
        } else {
          Thread.create({
            users: [currentUser._id, otherUser.id],
          })
            .then((targetThread) => {
              let targetThreadId = targetThread._id.toString();
              res.render('thread/chat', { otherUserUsername, targetThreadId });
            })
            .catch(console.error);
        }
      } else {
        res.render('home/index', { otherUserUsername });
      }
    } catch (err) {
      console.log(err);
    }
  },

  sendMessage: async (req, res) => {
    const { message, threadId } = req.body;

    try {
      let currentUser = req.user;
      let thread = await Thread.findById(threadId);
      let newMessage = new Message({
        content: message,
        user: currentUser.id.toString(),
        thread: threadId,
      });

      newMessage
        .save()
        .then(async (m) => {
          let targetThreadId = thread.id;
          let otherUserUsername = await User.findById(thread.users[1]);
          otherUserUsername = otherUserUsername.username;
          Message.find()
            .then((messages) => {
              messages = messages.map((x) => {
                if (x.user.toString() === currentUser.id.toString()) {
                  x.direction = 'right';
                } else {
                  x.direction = 'left';
                }

                if (
                  x.content.startsWith('http://') ||
                  x.content.startsWith('https://')
                ) {
                  x.isImage = true;
                } else {
                  x.isImage = false;
                }

                return x;
              });
              res.render('thread/chat', {
                otherUserUsername,
                messages,
                targetThreadId,
              });
            })
            .catch(console.error);
        })
        .catch(console.error);
    } catch (err) {
      console.log(err);
    }
  },
};
