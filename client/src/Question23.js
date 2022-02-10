import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question23() {
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q23")) {
      setInput(JSON.parse(localStorage.getItem("q23")));
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    min1: "",
    max1: "",
    min3: "",
    max3: "",
    min5: "",
    max5: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    localStorage.setItem("q23", JSON.stringify(input));
  }, [input]);

  function handleSubmit(e) {
    e.preventDefault();

    if (Object.entries(input).filter((x) => x[1] === "").length > 0) {
      handleShow();
    } else {
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

      navigate("/q24");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 22).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 22).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <h4 className="small-section-title">Секция: Инфляция</h4>
          <p>
            По данным Бюро национальной статистики АСПиР РК, годовая инфляция в
            Казахстане по итогам декабря сложилась на уровне 8,4%.
          </p>
          <p className="question">
            Какие показатели инфляции (в частности, индекса потребительских цен
            - ИПЦ) в Казахстане, по Вашему мнению, являются наиболее вероятными
            в перспективе следующих периодов?
          </p>

          <i>
            <p className="question-i">
              ПОЖАЛУЙСТА, УКАЖИТЕ МАКСИМАЛЬНОЕ И МИНИМАЛЬНОЕ ЗНАЧЕНИЕ В ТАБЛИЦЕ
              НИЖЕ
            </p>
          </i>
        </div>
      </div>
      {width <= 768 ? (
        <div className="left-align-text">
          <strong>
            <p style={{ color: "#db536a" }}>1 год</p>
          </strong>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="min1"
                value={input.min1}
                className="text-input-small"
                placeholder="Минимальное значение"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="max1"
                value={input.max1}
                className="text-input-small"
                placeholder="Максимальное значение"
              ></Form.Control>
            </Form.Group>
          </Form>
          <strong>
            <p style={{ color: "#db536a" }}>3 года</p>
          </strong>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="min3"
                value={input.min3}
                className="text-input-small"
                placeholder="Минимальное значение"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="max3"
                value={input.max3}
                className="text-input-small"
                placeholder="Максимальное значение"
              ></Form.Control>
            </Form.Group>
          </Form>
          <strong>
            <p style={{ color: "#db536a" }}>5 лет</p>
          </strong>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="min5"
                value={input.min5}
                className="text-input-small"
                placeholder="Минимальное значение"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="max5"
                value={input.max5}
                className="text-input-small"
                placeholder="Максимальное значение"
              ></Form.Control>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Минимальное значение</th>
              <th>Максимальное значение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 год</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="min1"
                  value={input.min1}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="max1"
                  value={input.max1}
                ></input>
              </td>
            </tr>
            <tr>
              <td>3 года</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="min3"
                  value={input.min3}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="max3"
                  value={input.max3}
                ></input>
              </td>
            </tr>
            <tr>
              <td>5 лет</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="min5"
                  value={input.min5}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="max5"
                  value={input.max5}
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      <Buttons click={handleSubmit} />
    </div>
  );
}
