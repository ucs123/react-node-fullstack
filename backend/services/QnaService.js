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
  /** ✏️ Edit question text */
  editQuestion(id, newText) {
    const question = db.questions.find(q => q.id === id);
    if (!question) return null;

    question.text = newText;
    question.updatedAt = new Date().toISOString();
    return question;
  }

  deleteQuestion(id) {
    const index = db.questions.findIndex(q => q.id === id);
    if (index === -1) return null;
  
    // Optional: remove related answers & comments too
    db.answers = db.answers.filter(a => a.questionId !== id);
    db.comments = db.comments.filter(c => {
      const answer = db.answers.find(a => a.id === c.answerId);
      return answer !== undefined;
    });
  
    const deleted = db.questions.splice(index, 1)[0];
    return deleted;
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
