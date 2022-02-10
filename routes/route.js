// const { Response } = require("../models/model");
const { Answer } = require("../models/model");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const objData = {
    uuid: req.body.uuid,
    date: req.body.date,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    question1: req.body.q1,
    question2: req.body.q2,
    question3: req.body.q3,
    question4: req.body.q4,
    question4other: req.body.q4other,
    question5: req.body.q5,
    question6: req.body.q6,
    question7: req.body.q7,
    question7other: req.body.q7other,
    question8: req.body.q8,
    question9: req.body.q9,
    question10: req.body.q10,
    question11: req.body.q11,
    question11other: req.body.q11other,
    question12: req.body.q12,
    question13: req.body.q13,
    question14: req.body.q14,
    question15: req.body.q15,
    question16: req.body.q16,
    question17: req.body.q17,
    question18: req.body.q18,
    question19: req.body.q19,
    question20: req.body.q20,
    question21: req.body.q21,
    question22: req.body.q22,
    question23: req.body.q23,
    question24: req.body.q24,
    question25: req.body.q25,
    question26: req.body.q26,
    question27: req.body.q27,
    question28: req.body.q28,
  };
  // console.log(objData);

  try {
    Answer.findOne({ uuid: req.body.uuid }, (error, data) => {
      if (data) {
        Answer.updateOne(
          { uuid: req.body.uuid },
          {
            $set: objData,
          },
          function (err, doc) {
            if (!err) {
              console.log("Document updated");
              res.send("Document updated");
            } else {
              console.log(err);
            }
          }
        );
      } else {
        let answer = new Answer(objData);
        const dataSave = answer.save();
        res.send("Data saved");
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
