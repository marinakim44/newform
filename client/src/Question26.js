import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question26() {
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q26")) {
      setInput(JSON.parse(localStorage.getItem("q26")));
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    rate1: "",
    corr1: "",
    rate3: "",
    corr3: "",
    rate5: "",
    corr5: "",
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
    localStorage.setItem("q26", JSON.stringify(input));
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
        q24: localStorage.getItem("q24"),
        q25: localStorage.getItem("q25"),
        q26: JSON.parse(localStorage.getItem("q26")),
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

      navigate("/q27");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 25).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 25).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <h4 className="small-section-title">Секция: Базовая ставка НБРК</h4>
          <p>
            В январе Комитет по денежно-кредитной политике НБРК принял решение
            установить базовую ставку на уровне 10,25% годовых с процентным
            коридором +/– 1,00 п.п.
          </p>
          <p className="question">
            Какие показатели базовой ставки НБРК, по Вашему мнению, являются
            наиболее вероятными в перспективе следующих периодов?
          </p>
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
                name="rate1"
                value={input.rate1}
                className="text-input-small"
                placeholder="Базовая ставка"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="corr1"
                value={input.corr1}
                className="text-input-small"
                placeholder="Коридор"
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
                name="rate3"
                value={input.rate3}
                className="text-input-small"
                placeholder="Базовая ставка"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="corr3"
                value={input.corr3}
                className="text-input-small"
                placeholder="Коридор"
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
                name="rate5"
                value={input.rate5}
                className="text-input-small"
                placeholder="Базовая ставка"
              ></Form.Control>

              <Form.Control
                type="text"
                onChange={handleChange}
                name="corr5"
                value={input.corr5}
                className="text-input-small"
                placeholder="Коридор"
              ></Form.Control>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Базовая ставка</th>
              <th>Коридор</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 год</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="rate1"
                  value={input.rate1}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="corr1"
                  value={input.corr1}
                ></input>
              </td>
            </tr>
            <tr>
              <td>3 года</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="rate3"
                  value={input.rate3}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="corr3"
                  value={input.corr3}
                ></input>
              </td>
            </tr>
            <tr>
              <td>5 лет</td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="rate5"
                  value={input.rate5}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  onChange={handleChange}
                  name="corr5"
                  value={input.corr5}
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
