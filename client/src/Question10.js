import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Form } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question10() {
  const [price, setPrice] = useState("");
  var today = new Date().toLocaleString("ru-KZ", {
    timeZone: "Asia/Almaty",
  });
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q10")) {
      setInput(JSON.parse(localStorage.getItem("q10")));
    }

    var config = {
      method: "get",
      url: "https://api.oilpriceapi.com/v1/prices/latest",
      headers: {
        Authorization: "Token 18a25e752a96e1aea909f174654374ae",
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.data.formatted);
        setPrice(response.data.data.formatted);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    localStorage.setItem("q10", JSON.stringify(input));
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

      navigate("/q11");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 9).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 9).toString() + "%",
            }}
          ></div>
        </div>

        <ModalAlert show={show} close={handleClose} />

        <div className="left-align-text">
          <h4 className="small-section-title">
            Секция: Цена на нефть марки Brent
          </h4>
          <p className="question">
            Какая цена в долларах США за баррель нефти марки BRENT может
            сложиться, по Вашему мнению, в перспективе следующих периодов?
          </p>
          <p className="question-i">
            {`К сведению, актуальное значение на ${today.slice(
              0,
              10
            )} - ${price}`}
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
