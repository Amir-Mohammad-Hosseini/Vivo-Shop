const commentModel = require("../../models/comment");
const courseModel = require("../../models/course");

exports.create = async (req, res, next) => {
  try {
    await commentModel.createValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const { body, courseShortName, score } = req.body;

    const course = await courseModel.findOne({ shortName: courseShortName });

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    const comment = await commentModel.create({
      body,
      course: course._id,
      creator: req.user._id,
      answer: 0,
      isAnswer: 0,
      score,
    });

    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

// controllers/v1/comment.js

exports.getAll = async (req, res, next) => {
  try {
    const allComments = await commentModel
      .find()
      .populate("creator", "-password")
      .populate("course")
      .lean();

    let comments = [];

    allComments.forEach((comment) => {
      let answerInfo = null;
      allComments.forEach((ans) => {
        if (String(comment._id) === String(ans.mainCommendID)) {
          answerInfo = ans;
        }
      });
      if (!comment.mainCommendID) {
        comments.push({
          ...comment,
          course: comment.course.name,
          answerContent: answerInfo,
        });
      }
    });
    return res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};


exports.remove = async (req, res, next) => {
  try {
    await commentModel.commentIdValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const deletedComment = await commentModel.findOneAndRemove({
      _id: req.params.id,
    });
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }
    return res.json(deletedComment);
  } catch (error) {
    next(error);
  }
};

exports.answer = async (req, res, next) => {
  try {
    await commentModel.answerValidation(req.body).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const { body } = req.body;

    const mainComment = await commentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        answer: 1,
      },
      { new: true }
    );

    const answerToComment = await commentModel.create({
      body,
      course: mainComment.course,
      creator: req.user._id,
      answer: 1,
      isAnswer: 1,
      mainCommendID: req.params.id,
      score: 5,
    });

    res.json(answerToComment);
  } catch (error) {
    next(error);
  }
};

exports.accept = async (req, res, next) => {
  try {
    await commentModel.commentIdValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });
    const acceptedComment = await commentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        answer: 1,
      },
      { new: true }
    );
    if (!acceptedComment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }

    res.json(acceptedComment);
  } catch (error) {
    next(error);
  }
};

exports.reject = async (req, res, next) => {
  try {
    await commentModel.commentIdValidation(req.params).catch((err) => {
      err.statusCode = 400;
      throw err;
    });

    const rejectedComment = await commentModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        answer: 0,
      },
      { new: true }
    );
    if (!rejectedComment) {
      return res.status(404).json({ message: "Comment Not Found!" });
    }

    res.json(rejectedComment);
  } catch (error) {
    next(error);
  }
};
