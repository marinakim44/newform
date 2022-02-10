import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question2() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q2-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q2-checked")));
    }
    if (localStorage.getItem("q2")) {
      setInput(localStorage.getItem("q2"));
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  function handleClick(e) {
    const { value } = e.target;
    setInput(value);

    setChecked((prev) => {
      return {
        ...prev,
        [value]: true,
      };
    });

    Object.keys(checked)
      .filter((v) => v === value)
      .map((v) => (checked[v] = true));
    Object.keys(checked)
      .filter((v) => v !== value)
      .map((v) => (checked[v] = false));
  }

  useEffect(() => {
    localStorage.setItem("q2", input);
    localStorage.setItem("q2-checked", JSON.stringify(checked));
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      uuid: localStorage.getItem("uuid"),
      date: localStorage.getItem("date"),
      q1: localStorage.getItem("q1"),
      q2: localStorage.getItem("q2"),
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
      navigate("/q3");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 1).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 1).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <p className="question">
            Хотели бы Вы, чтобы Ваше имя, должность и/или название Вашей
            организации фигурировало в общем списке респондентов?
          </p>
          <i>
            <p className="question-i">ПОЖАЛУЙСТА, ВЫБЕРИТЕ ТОЛЬКО ОДИН ОТВЕТ</p>
          </i>
          <p className="question-i">
            ВАЖНО. Отвечая на этот вопрос "Да", Вы, тем самым, не даете согласие
            на раскрытие Ваших комментариев. Комментарии могут быть раскрыты,
            если Вы дали на это согласие по каждому из них в отдельности. Все
            остальные ответы будут представлены в агрегированном виде.
          </p>
        </div>
      </div>
      <Form>
        <div className="left-align-text">
          <div className="m-div">
            <label className="m-label label-cell">
              <input
                type="radio"
                name="option"
                value="option1"
                onChange={handleClick}
                className="m-input radio-input"
                checked={checked.option1}
              />
              Да, согласен(-на) на имя, должность и название организации
            </label>
          </div>
          <div className="m-div">
            <label className="m-label">
              <input
                type="radio"
                name="option"
                value="option2"
                onChange={handleClick}
                className="m-input radio-input"
                checked={checked.option2}
              />
              Да, согласен(-на) только на имя
            </label>
          </div>
          <div className="m-div">
            <label className="m-label">
              <input
                type="radio"
                name="option"
                value="option3"
                onChange={handleClick}
                className="m-input radio-input"
                checked={checked.option3}
              />
              Да, согласен(-на) только на название организации
            </label>
          </div>
          <div className="m-div">
            <label className="m-label">
              <input
                type="radio"
                name="option"
                value="option4"
                onChange={handleClick}
                className="m-input radio-input"
                checked={checked.option4}
              />
              Нет, не согласен(-на)
            </label>
          </div>
        </div>
      </Form>
      <Buttons click={handleSubmit} />
    </div>
  );
}
