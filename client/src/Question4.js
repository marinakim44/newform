import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import ModalAlert from "./ModalAlert";
import "./App.css";
import "./Medium.css";
import axios from "axios";
import Buttons from "./Buttons";

export default function Question4() {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("q4")) {
      setInput(JSON.parse(localStorage.getItem("q4")));
    }

    if (localStorage.getItem("q4-other")) {
      setOther(localStorage.getItem("q4-other"));
    }

    if (localStorage.getItem("q4-checked")) {
      setChecked(JSON.parse(localStorage.getItem("q4-checked")));
    }
  }, []);
  const rows = [
    {
      key: "key1",
      value: "Квалифицированный и адаптивный персонал",
    },
    {
      key: "key2",
      value: "Развитая инфраструктура  (включая цифровую инфраструктуру)",
    },
    {
      key: "key3",
      value:
        "Снижение рисков изменения климата и ущерба окружающей среде (ESG)",
    },
    {
      key: "key4",
      value: "Высокий уровень занятости",
    },
    {
      key: "key5",
      value: "Эффективная налоговая система",
    },
    {
      key: "key6",
      value: "Большее равенство доходов населения",
    },
    {
      key: "key7",
      value: "Предсказуемая макроэкономическая среда",
    },
    {
      key: "key8",
      value: "Инвестиционная привлекательность страны",
    },
    {
      key: "key9",
      value: "Борьба с коррупцией и взяточничеством",
    },
    {
      key: "key10",
      value: "Верховенство права во всех сферах деятельности государства",
    },
    {
      key: "key11",
      value: "Доступ к недорогому капиталу",
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
    key7: false,
    key8: false,
    key9: false,
    key10: false,
    key11: false,
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
    localStorage.setItem("q4", JSON.stringify(input));
    localStorage.setItem("q4-other", other);
    localStorage.setItem("q4-checked", JSON.stringify(checked));
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
        q4other: localStorage.getItem("q4-other"),
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

      navigate("/q5");
    }
  }

  return (
    <div className="main">
      <div className="sticky-sub-div">
        <h2 className="percent">
          {Math.round(((100 / 29) * 3).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 3).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        <div className="left-align-text">
          <h4>Секция: Восстановление экономики</h4>

          <p className="question">
            На Ваш взгляд, какие факторы могут оказать значительное влияние на
            изменение в экономике Казахстана?
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
