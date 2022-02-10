import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ModalAlert from "./ModalAlert";
import "./App.css";
import "./Medium.css";
import axios from "axios";
import Buttons from "./Buttons";

export default function Question7() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q7")) {
      setInput(JSON.parse(localStorage.getItem("q7")));
    }

    if (localStorage.getItem("q7-other")) {
      setOther(localStorage.getItem("q7-other"));
    }

    if (localStorage.getItem("q7-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q7-checked")));
    }
  }, []);
  const rows = [
    {
      key: "key1",
      value: "Горнодобывающая промышленность",
    },
    {
      key: "key2",
      value: "Металлургия, металлообработка, машиностроение",
    },
    {
      key: "key3",
      value: "Транспорт и складирование",
    },
    {
      key: "key4",
      value: "Туризм",
    },
    {
      key: "key5",
      value: "Информация и связь (5G)",
    },
    {
      key: "key6",
      value: "Информационные технологии (IT-сектор)",
    },
  ];

  const width = window.screen.width;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const [checked, setChecked] = useState({
    key1: false,
    key2: false,
    key3: false,
    key4: false,
    key5: false,
    key6: false,
  });
  const [other, setOther] = useState("");

  function handleChange(e) {
    const { name } = e.target;

    setChecked((prev) => {
      return {
        ...prev,
        [name]: !checked[name],
      };
    });
  }

  useEffect(() => {
    Object.entries(checked)
      .filter((x) => x[1] === true)
      .forEach((x) => {
        if (!input.includes(x[0])) {
          input.push(x[0]);
        }
      });

    Object.entries(checked)
      .filter((x) => x[1] === false)
      .forEach((x) => {
        if (input.includes(x[0])) {
          setInput(input.filter((a) => a !== x[0]));
        }
      });
  }, [checked, input]);

  function handleChangeOther(e) {
    setOther(e.target.value);
  }

  useEffect(() => {
    localStorage.setItem("q7", JSON.stringify(input));
    localStorage.setItem("q7-other", other);
    localStorage.setItem("q7-checked", JSON.stringify(checked));
  }, [input, other, checked]);

  function handleSubmit(e) {
    e.preventDefault();
    if (input.length === 0 && !other) {
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

      navigate("/q8");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 6).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 6).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        <div className="left-align-text">
          <h4>Секция: Восстановление экономики</h4>

          <p className="question">
            Какие секторы, по вашему мнению, будут иметь наиболее сильное
            влияние на изменение ВВП Республики Казахстан в горизонте от одного
            года до 5 лет?
          </p>
          <p className="question-i">
            <i>ПОЖАЛУЙСТА, ВЫБЕРИТЕ ВСЕ, ЧТО ПРИМЕНИМО</i>
          </p>
        </div>
      </div>
      {width <= 768 ? (
        <div className="left-align-text">
          {rows.map((row) => {
            return (
              <div className="m-div" key={row.key}>
                <label>
                  <input
                    style={{ marginRight: "8px" }}
                    type="checkbox"
                    name={row.key}
                    value={row.key}
                    onChange={handleChange}
                    checked={checked[`${row.key}`] === true ? true : false}
                  />
                  {row.value}
                </label>
              </div>
            );
          })}
          <div style={{ width: "100%" }}>
            <Form.Control
              type="text"
              placeholder="Прочие действия (просьба указать)"
              value={other}
              onChange={handleChangeOther}
              className="input-text"
              style={{ marginTop: "2rem" }}
            ></Form.Control>
          </div>
        </div>
      ) : (
        <Form style={{ textAlign: "left" }}>
          {rows.map((row) => {
            return (
              <Form.Group key={row.key}>
                <label>
                  <input
                    style={{ marginRight: "8px" }}
                    type="checkbox"
                    name={row.key}
                    value={row.key}
                    onChange={handleChange}
                    checked={checked[`${row.key}`] === true ? true : false}
                  />
                  {row.value}
                </label>
              </Form.Group>
            );
          })}
          <Form.Control
            type="text"
            placeholder="Другой вариант ответа [ пожалуйста уточните ]"
            value={other}
            onChange={handleChangeOther}
            className="text-input"
          ></Form.Control>
        </Form>
      )}
      <Buttons click={handleSubmit} />
    </div>
  );
}
