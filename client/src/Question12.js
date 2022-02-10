import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question12() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q12")) {
      setInput(localStorage.getItem("q12"));
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

    localStorage.setItem("q12", input);

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
      navigate("/q13");
    } else {
      navigate("/q14");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 11).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 11).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />

        <p className="left-align-text">
          <strong>ОПЦИОНАЛЬНО.</strong> Прокомментируйте, пожалуйста, Ваши
          ответы. Нам интересно Ваше мнение.
        </p>
      </div>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Пожалуйста, укажите"
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
