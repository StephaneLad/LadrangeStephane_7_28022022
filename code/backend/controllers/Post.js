const postModel = require("../models/post");
const userModel = require("../models/user");
const sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { where } = require("sequelize");
const user = require("../models/user");

exports.create = (req, res) => {
  if (req.file !== undefined) {
    postModel
      .create({
        id_post: 0,
        text_content: req.body.postContent,
        url_img_post: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        id_user: req.body.userId,
      })
      .then(() => res.status(201).json({message:'post crée'}))
      .catch((err) => console.log(err));
  } else {
    postModel
      .create({
        id_post: 0,
        text_content: req.body.postContent,
        id_user: req.body.userId,
      })
      .then(() => res.status(201).json({message:'post crée'}))
      .catch((err) => console.log(err));
  }
};

exports.update = (req, res) => {
  userModel
    .findOne({ where: { id_user: `${req.body.userId}` } })
    .then((user) => {
      if (user.is_admin === 1) {
        if (req.file !== undefined) {
          postModel
            .findOne({ where: { id_post: `${req.body.id_post}` } })
            .then((post) => {
              if (req.body.postContent !== undefined) {
                post.text_content = req.body.postContent;
              }
              const filename = post.url_img_post.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                post.url_img_post = `${req.protocol}://${req.get(
                "host"
              )}/images/${req.file.filename}`;
              post
                .save()
                .then(res.status(200).json({message:'post modifié'}))
                .catch((err) => console.log(err));
              });
            })
            .catch((err) => console.log(err));
        } else {
          postModel
            .findOne({ where: { id_post: `${req.body.id_post}` } })
            .then((post) => {
              
              if (req.body.postContent !== undefined) {
                post.text_content = req.body.postContent;
              }
              post
                .save()
                .then(res.status(200).json({message:'post modifié'}))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      }
      else{if (req.file !== undefined) {
        postModel
          .findOne({ where: { id_post: `${req.body.id_post}` } })
          .then((post) => {
            if (user.id_user === post.id_user) {
              if (req.body.postContent !== undefined) {
                post.text_content = req.body.postContent;
              }
              const filename = post.url_img_post.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                post.url_img_post = `${req.protocol}://${req.get(
                "host"
              )}/images/${req.file.filename}`;
              post
                .save()
                .then(res.status(200).json({message:'post modifié'}))
                .catch((err) => console.log(err));
              });
            } else {
              res.status(400).json({message:'invalid user'});
            }
          })
          .catch((err) => console.log(err));
      } else {
        postModel
          .findOne({ where: { id_post: `${req.body.id_post}` } })
          .then((post) => {
            if (user.id_user === post.id_user) {
              if (req.body.postContent !== undefined) {
                post.text_content = req.body.postContent;
              }
              post
                .save()
                .then(res.status(200).json({message:'post modifié'}))
                .catch((err) => console.log(err));
            } else {
              res.status(400).json({message:'invalid user'});
            }
          })
          .catch((err) => console.log(err));
      }
    }})
    .catch((err) => console.log(err))
};

exports.delete = (req, res) => {
  userModel
    .findOne({ where: { id_user: `${req.body.id_user}` } })
    .then((user) => {
      if (user.is_admin === 1) {
        postModel
          .findOne({ where: { id_post: `${req.body.id_post}` } })
          .then((post) => {
            if (post.url_img_post !== null) {
              const filename = post.url_img_post.split("/images/")[1];
              fs.unlink(`images/${filename}`, () => {
                postModel
                  .destroy({ where: { id_post: `${req.body.id_post}` } })
                  .then(() =>
                    res.status(200).json({ message: "post suprimer" })
                  )
                  .catch((error) => res.status(400).json({ error }));
              });
            } else {
              postModel
                .destroy({ where: { id_post: `${req.body.id_post}` } })
                .then(() => res.status(200).json({ message: "post suprimer" }))
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((err) => console.log(err));
      } else {
        postModel
          .findOne({ where: { id_post: `${req.body.id_post}` } })
          .then((post) => {
            if(user.id_user===post.id_user){
              if (post.url_img_post !== null) {
                const filename = post.url_img_post.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                  postModel
                    .destroy({ where: { id_post: `${req.body.id_post}` } })
                    .then(() =>
                      res.status(200).json({ message: "post suprimer" })
                    )
                    .catch((error) => res.status(400).json({ error }));
                });
              } else {
                postModel
                  .destroy({ where: { id_post: `${req.body.id_post}` } })
                  .then(() => res.status(200).json({ message: "post suprimer" }))
                  .catch((error) => res.status(400).json({ error }));
              }
            }else{
              res.status(400).json({message:'invalid user'})
            }
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err))
};

exports.getAll = (req, res) => {
  postModel
    .findAll()
    .then((posts) => {
      let post = [];
      let lengthList = posts.length - 1;
      getUser();
      async function getUser() {
        for (let i = 0; i < posts.length; i++) {
          await userModel
            .findOne({ where: { id_user: `${posts[i].id_user}` } })
            .then((user) => {
              post = [{ post: posts[i], user_name: user.user_name },...post];
            })
            .catch((err) => console.log(err));
          if (i === lengthList) {
            res.status(200).json({ post });
          }
        }
      }
    })

    .catch((err) => console.log(err));
};

exports.getOne = (req, res) => {
  postModel
    .findOne({ where: { id_post: `${req.body.id_post}` } })
    .then((posts) => {
      let post = [];
      userModel
        .findOne({ where: { id_user: `${posts.id_user}` } })
        .then((user) => {
          post = [{ post: posts, user_name: user.user_name }];
          res.status(200).json({ post });
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
};


exports.getAllUser = (req, res) => {
  postModel
  .findAll({where:{id_user:`${req.body.id_user}`}})
  .then((posts) => {
    let post = [];
    let lengthList = posts.length-1 ;
    let mainUser={}
    getUser();
    async function getUser() {
      if(posts.length===0){
        await userModel
          .findOne({ where: { id_user: `${req.body.id_user}` } })
          .then((user) => {
            mainUser={user:user}
            res.status(200).json({mainUser})
          })
          .catch((err) => console.log(err));
      }
      for (let i = 0; i < posts.length; i++) {
        await userModel
          .findOne({ where: { id_user: `${posts[i].id_user}` } })
          .then((user) => {
            post = [{ post: posts[i], user_name: user.user_name },...post];
            mainUser={user:user}
          })
          .catch((err) => console.log(err));
        if (i === lengthList) {
          res.status(200).json({ post,mainUser });
        }
      }
    }
  })

  .catch((err) => console.log(err));
};