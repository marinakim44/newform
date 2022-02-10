const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  date: String,
  uuid: String,
  name: String,
  company: String,
  email: String,
  question1: String,
  question2: String,
  question3: String,
  question4: Array,
  question4other: String,
  question5: Object,
  question6: String,
  question7: Array,
  question7other: String,
  question8: String,
  question9: String,
  question10: Object,
  question11: Array,
  question11other: String,
  question12: String,
  question13: String,
  question14: Object,
  question15: String,
  question16: String,
  question17: Object,
  question18: String,
  question19: String,
  question20: Object,
  question21: String,
  question22: String,
  question23: Object,
  question24: String,
  question25: String,
  question26: Object,
  question27: String,
  question28: String,
});

const Answer = mongoose.model("Answer", answerSchema);

exports.Answer = Answer;
