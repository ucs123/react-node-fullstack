const express = require("express");
const router = express.Router();
const QnaController = require("../controllers/QnaController");
const { authenticateToken } = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticateToken);

/* -------------------- QUESTIONS -------------------- */
router.post("/questions", (req, res) => QnaController.createQuestion(req, res));
router.get("/questions", (req, res) => QnaController.getAllQuestions(req, res));
router.get("/questions/:id", (req, res) => QnaController.getQuestionById(req, res));

/* -------------------- ANSWERS -------------------- */
router.post("/answers", (req, res) => QnaController.createAnswer(req, res));
router.get("/answers", (req, res) => QnaController.getAllAnswers(req, res));

/* -------------------- COMMENTS -------------------- */
router.post("/comments", (req, res) => QnaController.createComment(req, res));
router.get("/comments", (req, res) => QnaController.getAllComments(req, res));

module.exports = router;
