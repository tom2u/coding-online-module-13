Vote.create({
  user_id: body.user_id,
  post_id: body.post_id,
}).then(() => {
  // then find the post we just voted on
  return Post.findOne({
    where: {
      id: body.post_id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ]
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

const sequelize = require("../../config/connection");

I'm getting this error:

user_id: body.user_id,
           ^
ReferenceError: body is not defined

...in reference to this:

// create the vote
Vote.create({
  user_id: body.user_id,
  post_id: body.post_id
}).then(() => {

...being in post-routes.js

// create the vote
Vote.create({
  user_id: body.user_id,
  post_id: body.post_id,
}).then(() => {
  // then find the post we just voted on
  return Post.findOne({
    where: {
      id: body.post_id,
    },
    attributes: [
      "id",
      "post_url",
      "title",
      "created_at",
      // use raw MySQL aggregate function query to get a count of how many votes the post has and return it under the name `vote_count`
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});
