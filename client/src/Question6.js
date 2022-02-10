import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question6() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q6-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q6-checked")));
    }
    if (localStorage.getItem("q6")) {
      setInput(localStorage.getItem("q6"));
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
    option5: false,
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
    localStorage.setItem("q6", input);
    localStorage.setItem("q6-checked", JSON.stringify(checked));
  });

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
      navigate("/q7");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 5).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 5).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <h4>Секция: Восстановление экономики</h4>
          <p className="question">
            Как, по вашему мнению, изменится ВВП Республики Казахстан в 2022
            году?
          </p>
          <p>
            К сведению, согласно данным Бюро национальной статистики АСПиР РК,
            за 9 месяцев 2021 года ВВП в текущих ценах составил 53,03 трлн тенге
            (годовой прирост -15,78% (относительно 9м2020)), а в 2020 - 70,7
            трлн тенге (годовой прирост - 1,7%)
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
              ВВП страны сократится по сравнению с ВВП 2021 года
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
              Прирост составит до 2% по сравнению с ВВП 2021 года
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
              Прирост составит от 2% (включительно) до 5% по сравнению с ВВП
              2021 года
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
              Прирост составит от 5% (включительно) до 10% по сравнению с ВВП
              2021 года
            </label>
          </div>
          <div className="m-div">
            <label className="m-label">
              <input
                type="radio"
                name="option"
                value="option5"
                onChange={handleClick}
                className="m-input radio-input"
                checked={checked.option5}
              />
              Прирост составит 10% или выше по сравнению с ВВП 2021 года
            </label>
          </div>
        </div>
      </Form>
      <Buttons click={handleSubmit} />
    </div>
  );
}
