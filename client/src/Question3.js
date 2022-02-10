import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question3() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("q3-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q3-checked")));
    }
    if (localStorage.getItem("q3")) {
      setInput(localStorage.getItem("q3"));
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
    localStorage.setItem("q3", input);
    localStorage.setItem("q3-checked", JSON.stringify(checked));
  });

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      uuid: localStorage.getItem("uuid"),
      date: localStorage.getItem("date"),
      q1: localStorage.getItem("q1"),
      q2: localStorage.getItem("q2"),
      q3: localStorage.getItem("q3"),
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
      navigate("/q4");
    } else {
      handleShow();
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 2).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 2).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <h4>Секция: Восстановление экономики</h4>
          <p className="question">
            По какой траектории, по Вашему мнению, в текущий момент движется
            экономика Казахстана?
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
              Сценарий V (быстрое падение и столь же быстрое восстановление)
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
              Сценарий U (чуть более длительный период низкой экономической
              активности, с последующим восстановлением)
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
              Сценарий L (резкий обвал и последующая депрессия, которая не даст
              экономике восстановиться до докризисных показателей)
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
              Сценарий W (резкий обвал, быстрое восстановление, за которым
              следует новый спад, и снова восстановление)
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
              Сценарий K (восстановление различных секторов экономики происходит
              с разной скоростью)
            </label>
          </div>
        </div>
      </Form>
      <Buttons click={handleSubmit} />
    </div>
  );
}
