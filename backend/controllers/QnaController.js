const QnaService = require("../services/QnaService");

class QnaController {
  /* -------------------- QUESTIONS -------------------- */
  createQuestion(req, res) {
    const { text, author, parentId } = req.body;
    if (!text) return res.status(400).json({ error: "Question text required" });

    const newQ = QnaService.createQuestion({ text, author, parentId });
    res.status(201).json(newQ);
  }

  getAllQuestions(req, res) {
    res.json(QnaService.getAllQuestions());
  }

  getQuestionById(req, res) {
    const q = QnaService.getQuestionById(parseInt(req.params.id));
    if (!q) return res.status(404).json({ error: "Question not found" });
    res.json(q);
  }

  /* -------------------- ANSWERS -------------------- */
  createAnswer(req, res) {
    const { questionId, text, author } = req.body;
    if (!text) return res.status(400).json({ error: "Answer text required" });

    const newA = QnaService.createAnswer({ questionId, text, author });
    if (!newA) return res.status(404).json({ error: "Question not found" });
    res.status(201).json(newA);
  }

  getAllAnswers(req, res) {
    res.json(QnaService.getAllAnswers());
  }

  /* -------------------- COMMENTS -------------------- */
  createComment(req, res) {
    const { answerId, text, author } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text required" });

    const newC = QnaService.createComment({ answerId, text, author });
    if (!newC) return res.status(404).json({ error: "Answer not found" });
    res.status(201).json(newC);
  }

  getAllComments(req, res) {
    res.json(QnaService.getAllComments());
  }
}

module.exports = new QnaController();
