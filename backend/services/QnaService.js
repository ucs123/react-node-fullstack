const db = require("../models/QnaModel");

class QnaService {
  /* -------------------- QUESTIONS -------------------- */
  createQuestion({ text, author, parentId }) {
    const newQ = {
      id: db.qCounter++,
      text,
      author: author || "Anonymous",
      parentId: parentId || null,
      createdAt: new Date().toISOString()
    };
    db.questions.push(newQ);
    return newQ;
  }

  getAllQuestions() {
    return db.questions;
  }

  getQuestionById(id) {
    const q = db.questions.find(q => q.id === id);
    if (!q) return null;

    const qAnswers = db.answers.filter(a => a.questionId === id);
    const enrichedAnswers = qAnswers.map(a => ({
      ...a,
      comments: db.comments.filter(c => c.answerId === a.id)
    }));

    return {
      ...q,
      answers: enrichedAnswers,
      replies: db.questions.filter(r => r.parentId === id)
    };
  }

  /* -------------------- ANSWERS -------------------- */
  createAnswer({ questionId, text, author }) {
    const question = db.questions.find(q => q.id === questionId);
    if (!question) return null;

    const newA = {
      id: db.aCounter++,
      questionId,
      text,
      author: author || "Anonymous",
      createdAt: new Date().toISOString()
    };
    db.answers.push(newA);
    return newA;
  }

  getAllAnswers() {
    return db.answers;
  }

  /* -------------------- COMMENTS -------------------- */
  createComment({ answerId, text, author }) {
    const answer = db.answers.find(a => a.id === answerId);
    if (!answer) return null;

    const newC = {
      id: db.cCounter++,
      answerId,
      text,
      author: author || "Anonymous",
      createdAt: new Date().toISOString()
    };
    db.comments.push(newC);
    return newC;
  }

  getAllComments() {
    return db.comments;
  }
}

module.exports = new QnaService();
