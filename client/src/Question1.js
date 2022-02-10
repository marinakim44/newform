import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";
import { v4 as uuidv4 } from "uuid";

export default function Question1() {
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState({
    option1: false,
    option2: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = uuidv4();
    const date = new Date().toLocaleString("ru-KZ", {
      timeZone: "Asia/Almaty",
    });
    localStorage.setItem("uuid", id);
    localStorage.setItem("date", date);

    if (localStorage.getItem("q1-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q1-checked")));
    }
    if (localStorage.getItem("q1")) {
      setInput(localStorage.getItem("q1"));
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

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
    localStorage.setItem("q1", input);
    localStorage.setItem("q1-checked", JSON.stringify(checked));
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      uuid: localStorage.getItem("uuid"),
      date: localStorage.getItem("date"),
      q1: localStorage.getItem("q1"),
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
      .catch((err) => console.log(err.response));

    if (input) {
      if (input === "option1") {
        navigate("/start");
      }
      if (input === "option2") {
        navigate("/finish");
      }
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 12) * 0).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 12) * 0).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <p className="question">
            Нажимая кнопку "Согласен(-на)", Вы подтверждает свое согласие на
            сбор и обработку персональных данных, которые будут предоставлены в
            рамках данного опроса. Согласие включает сбор, хранение, обновление,
            использование и передачу (включая трансграничную передачу) внутри
            компаний глобальной сети PwC для осуществления действий по обмену
            информации, а также осуществлению иных действий, предусмотренных
            действующим законодательством Республики Казахстан. Данное согласие
            действует в течение срока хранения информации или до момента отзыва
            согласия.
          </p>
          <i>
            <p className="question-i">ПОЖАЛУЙСТА, ВЫБЕРИТЕ ТОЛЬКО ОДИН ОТВЕТ</p>
          </i>
        </div>
      </div>

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
            Согласен(-на). Перейти к заполнению формы.
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
            Не согласен(-на). Закончить заполнение формы.
          </label>
        </div>
      </div>

      <Buttons click={handleSubmit} />
    </div>
  );
}
