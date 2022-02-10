import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question9() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q9-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q9-checked")));
    }
    if (localStorage.getItem("q9")) {
      setInput(localStorage.getItem("q9"));
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
    localStorage.setItem("q9", input);
    localStorage.setItem("q9-checked", JSON.stringify(checked));
  }, [input, checked]);

  function handleSubmit(e) {
    e.preventDefault();
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
      navigate("/q10");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 8).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 8).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <p className="question">
            Если Вы добавили комментарий, разрешаете ли Вы указать Ваше личное
            имя, должность и наименование организации при публикации данного
            комментария для широкой аудитории?
          </p>
          <i>
            <p className="question-i">ПОЖАЛУЙСТА, ВЫБЕРИТЕ ТОЛЬКО ОДИН ОТВЕТ</p>
          </i>
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
              Да, разрешаю публикацию с указанием личного имени, должности и
              наименования организации
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
              Да, разрешаю публикацию с указанием личного имени, но без указания
              должности и наименования организации
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
              Да, разрешаю публикацию с указанием только наименования
              организации
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
              Нет, не разрешаю
            </label>
          </div>
        </div>
      </Form>
      <Buttons click={handleSubmit} />
    </div>
  );
}
