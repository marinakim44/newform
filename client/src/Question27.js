import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question27() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q27")) {
      setInput(localStorage.getItem("q27"));
    }
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("q27", input);

    const data = {
      uuid: localStorage.getItem("uuid"),
      date: localStorage.getItem("date"),
      q1: localStorage.getItem("q1"),
      q2: localStorage.getItem("q2"),
      q3: localStorage.getItem("q3"),
      q4: JSON.parse(localStorage.getItem("q4")),
      q4none: localStorage.getItem("q4-none"),
      q4other: localStorage.getItem("q4-other"),
      q5a: localStorage.getItem("q5a"),
      q5b: localStorage.getItem("q5b"),
      q5c: localStorage.getItem("q5c"),
      q5d: localStorage.getItem("q5d"),
      q5e: localStorage.getItem("q5e"),
      q5f: localStorage.getItem("q5f"),
      q5g: localStorage.getItem("q5g"),
      q6: localStorage.getItem("q6"),
      q7: JSON.parse(localStorage.getItem("q7")),
      q8: localStorage.getItem("q8"),
      q9: localStorage.getItem("q9"),
      q10: JSON.parse(localStorage.getItem("q10")),
      q11: JSON.parse(localStorage.getItem("q11")),
      q12: localStorage.getItem("q12"),
      q13: localStorage.getItem("q13"),
      q14: JSON.parse(localStorage.getItem("q14")),
      q15: localStorage.getItem("q15"),
      q16: localStorage.getItem("q16"),
      q17: JSON.parse(localStorage.getItem("q17")),
      q18: localStorage.getItem("q18"),
      q19: localStorage.getItem("q19"),
      q20: JSON.parse(localStorage.getItem("q20")),
      q21: localStorage.getItem("q21"),
      q22: localStorage.getItem("q22"),
      q23: JSON.parse(localStorage.getItem("q23")),
      q24: localStorage.getItem("q24"),
      q25: localStorage.getItem("q25"),
      q26: JSON.parse(localStorage.getItem("q26")),
      q27: localStorage.getItem("q27"),
    };

    axios
      .post("/allinputs", data)
      .then((response) => {
        if (response.status === 200) {
          console.log("Data posted");
        } else {
          console.log("Response status " + response.status);
        }
      })
      .catch((err) => console.log(err.response.data));

    if (input) {
      navigate("/q28");
    } else {
      navigate("/finish");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 26).toString())}% ??????????????????
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 26).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />

        <p className="left-align-text">
          <strong>??????????????????????.</strong> ????????????????????????????????, ????????????????????, ????????
          ????????????. ?????? ?????????????????? ???????? ????????????.
        </p>
      </div>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="????????????????????, ??????????????"
            value={input}
            onChange={handleChange}
            className="input-text"
          ></Form.Control>
        </Form.Group>
        <Buttons click={handleSubmit} />
      </Form>
    </div>
  );
}
