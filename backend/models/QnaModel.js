class QnaModel {
  constructor() {
    this.questions = [{
      "id": 1,
      "text": "What is Node.js?",
      "author": "Umesh",
      "parentId": null,
      "createdAt": "2025-09-14T12:00:00.000Z",
      "answers": [
        {
          "id": 1,
          "questionId": 1,
          "text": "Node.js is a JS runtime.",
          "author": "Dev",
          "createdAt": "2025-09-14T12:10:00.000Z",
          "comments": [
            {
              "id": 1,
              "answerId": 1,
              "text": "Can you give an example?",
              "author": "Priya",
              "createdAt": "2025-09-14T12:12:00.000Z"
            }
          ]
        }
      ],
      "replies": [
        {
          "id": 2,
          "text": "Can Node.js handle multithreading?",
          "author": "Aarti",
          "parentId": 1,
          "createdAt": "2025-09-14T12:05:00.000Z"
        }
      ]
    }];
    this.answers = [];
    this.comments = [];
    this.qCounter = 1;
    this.aCounter = 1;
    this.cCounter = 1;
  }
}

module.exports = new QnaModel();