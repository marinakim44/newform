import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Table, Dropdown, Row, Col } from "react-bootstrap";
import "./App.css";
import "./Medium.css";
import "./Small.css";
import axios from "axios";
import ModalAlert from "./ModalAlert";
import Buttons from "./Buttons";

export default function Question5() {
  const width = window.screen.width;
  const [listOfNumbers, setListOfNumbers] = useState([1, 2, 3, 4, 5, 6, 7]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
  });

  var listOfValues = [
    "A - Сельскохозяйственный сектор",
    "B - Промышленный сектор",
    "C - Энергетический сектор",
    "D - Транспортный сектор (включая логистику)",
    "E - Торговый сектор (включая электронную коммерцию)",
    "F - Финансовый сектор (банки, страховые/брокерские компании, FinTech)",
    "G - Сектор услуг ( услуги связи, туристические и связанные с ними услуги, услуги по организации досуга, культурных и спортивных мероприятий)",
  ];

  function handleSelect(e) {
    const industry = e.slice(0, 1);
    const number = parseInt(e.slice(e.length - 1, e.length));

    if (Object.entries(input).filter((x) => x[0] === industry)[0][1] === "") {
      setInput((prev) => {
        return {
          ...prev,
          [industry]: number,
        };
      });
      const index = listOfNumbers.indexOf(number);
      listOfNumbers.splice(index, 1);
    } else {
      listOfNumbers.push(
        parseInt(Object.entries(input).filter((x) => x[0] === industry)[0][1])
      );
      listOfNumbers.sort();

      setInput((prev) => {
        return {
          ...prev,
          [industry]: number,
        };
      });

      const index = listOfNumbers.indexOf(number);
      listOfNumbers.splice(index, 1);
    }
  }
  useEffect(() => {
    localStorage.setItem("q5", JSON.stringify(input));
  }, [input, listOfNumbers]);

  const [active, setActive] = useState(false);
  const handleFocus = () => {
    setActive(true);
  };
  const handleBlur = () => {
    setActive(false);
  };

  function handleReset() {
    setInput({
      A: "",
      B: "",
      C: "",
      D: "",
      E: "",
      F: "",
      G: "",
    });
    setListOfNumbers([1, 2, 3, 4, 5, 6, 7]);
  }

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
        q5: JSON.parse(localStorage.getItem("q5")),
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

      navigate("/q6");
    }
  }

  return (
    <div className="main">
      <div className={active === true ? "" : "sticky-sub-div"}>
        <h2 className="percent">
          {Math.round(((100 / 29) * 4).toString())}% завершено
        </h2>
        <div className="progressBarEmpty">
          <div
            className="progressBarFilled"
            style={{
              width: ((100 / 29) * 4).toString() + "%",
            }}
          ></div>
        </div>
        <ModalAlert show={show} close={handleClose} />
        <div className="left-align-text">
          <h4>Секция: Восстановление экономики</h4>
        </div>
        <p className="question">
          Расположите нижеперечисленные сектора экономики в порядке убывания
          темпов их восстановления и дальнейшего развития, выбрав порядковый
          номер от 1 до 7.
          <br /> 1 - самое быстрое восстановление, 7 - самое медленное
          восстановление
        </p>

        <p className="question-i">
          <i>
            ПОЖАЛУЙСТА, УКАЖИТЕ ТОЛЬКО ОДИН ВАРИАНТ ОТВЕТА ДЛЯ КАЖДОЙ СТРОКИ
          </i>
        </p>
      </div>
      {width <= 768 ? (
        <div style={{ textAlign: "left" }}>
          {listOfValues.map((v) => {
            return (
              <Row style={{ verticalAlign: "middle" }} key={v}>
                <Col sm={6}>
                  <p style={{ color: "#db536a" }}>
                    <strong>{v}</strong>
                  </p>
                </Col>
                <Col>
                  <Dropdown
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSelect={handleSelect}
                    className="s-q13"
                  >
                    <Dropdown.Toggle
                      variant="light"
                      id="dropdown-basic"
                      className="select-btn"
                    >
                      {Object.entries(input).filter(
                        (x) => x[0] === v.slice(0, 1) && x[1] !== ""
                      ).length > 0
                        ? Object.entries(input)
                            .filter((x) => x[0] === v.slice(0, 1))[0]
                            .slice(-1)
                        : "Выбрать"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {listOfNumbers.map((num) => {
                        return (
                          <Dropdown.Item
                            eventKey={`${v.slice(0, 1)}${num}`}
                            name="dropdownname"
                            value="dropdownvalue"
                          >
                            {num}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            );
          })}
          <Button
            variant="outline-dark"
            style={{ width: "100%" }}
            onClick={handleReset}
          >
            Сбросить
          </Button>
        </div>
      ) : (
        <>
          <div className="reset-div">
            <Button
              variant="outline-dark"
              className="reset-btn"
              onClick={handleReset}
            >
              Сбросить
            </Button>
          </div>
          <Table bordered>
            <tbody>
              {listOfValues.map((v) => {
                return (
                  <tr className="table-row" key={v}>
                    <td style={{ verticalAlign: "middle", textAlign: "left" }}>
                      <p>{v}</p>
                    </td>
                    <td>
                      <Dropdown
                        onSelect={handleSelect}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      >
                        <Dropdown.Toggle
                          variant="light"
                          id="dropdown-basic"
                          className="select-btn"
                        >
                          {Object.entries(input).filter(
                            (x) => x[0] === v.slice(0, 1) && x[1] !== ""
                          ).length > 0
                            ? Object.entries(input)
                                .filter((x) => x[0] === v.slice(0, 1))[0]
                                .slice(-1)
                            : "Выбрать"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {listOfNumbers.map((num) => {
                            return (
                              <Dropdown.Item
                                eventKey={`${v.slice(0, 1)}${num}`}
                                name="dropdownname"
                                value="dropdownvalue"
                                key={num}
                              >
                                {num}
                              </Dropdown.Item>
                            );
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}

      <Buttons click={handleSubmit} />
    </div>
  );
}
