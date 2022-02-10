import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalAlert from "./ModalAlert";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function Start() {
  const width = window.screen.width;
  useEffect(() => {
    window.scrollTo(0, 0);

    if (localStorage.getItem("name")) {
      setInput((prev) => {
        return {
          ...prev,
          name: localStorage.getItem("name"),
        };
      });
    }
    if (localStorage.getItem("company")) {
      setInput((prev) => {
        return {
          ...prev,
          company: localStorage.getItem("company"),
        };
      });
    }
    if (localStorage.getItem("title")) {
      setInput((prev) => {
        return {
          ...prev,
          title: localStorage.getItem("title"),
        };
      });
    }
    if (localStorage.getItem("email")) {
      setInput((prev) => {
        return {
          ...prev,
          email: localStorage.getItem("email"),
        };
      });
    }
    if (localStorage.getItem("phone")) {
      setInput((prev) => {
        return {
          ...prev,
          phone: localStorage.getItem("phone"),
        };
      });
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    company: "",
    title: "",
    email: "",
    phone: "",
    uuid: "",
  });
  const [errorName, setErrorName] = useState(false);
  const [errorCompany, setErrorCompany] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [validationErrorEmail, setValidationErrorEmail] = useState(false);
  const [active, setActive] = useState({
    name: false,
    company: false,
    title: false,
    email: false,
    phone: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleBlurName() {
    if (!input.name) {
      setErrorName(true);
    }
    setActive((prev) => {
      return {
        ...prev,
        name: false,
      };
    });
  }

  function handleFocusName() {
    if (errorName) {
      setErrorName(false);
    }

    Object.keys(active)
      .filter((el) => el === "name")
      .forEach((el) => {
        active[el] = true;
      });
    Object.keys(active)
      .filter((el) => el !== "name")
      .forEach((el) => {
        active[el] = false;
      });

    setActive((prev) => {
      return {
        ...prev,
        name: true,
      };
    });
  }

  function handleBlurCompany() {
    if (!input.company) {
      setErrorCompany(true);
    }
    setActive((prev) => {
      return {
        ...prev,
        company: false,
      };
    });
  }

  function handleFocusCompany() {
    if (errorCompany) {
      setErrorCompany(false);
    }
    Object.keys(active)
      .filter((el) => el === "company")
      .forEach((el) => {
        active[el] = true;
      });
    Object.keys(active)
      .filter((el) => el !== "company")
      .forEach((el) => {
        active[el] = false;
      });

    setActive((prev) => {
      return {
        ...prev,
        company: true,
      };
    });
  }

  function validateEmail(email) {
    const re = /.+@.+\.+.+/;
    return re.test(email);
  }

  function handleBlurEmail() {
    if (!input.email) {
      setErrorEmail(true);
    } else {
      validateEmail(input.email);
      if (validateEmail(input.email)) {
        setValidationErrorEmail(false);
      } else {
        setValidationErrorEmail(true);
      }
    }

    setActive((prev) => {
      return {
        ...prev,
        email: false,
      };
    });
  }

  function handleFocusEmail() {
    if (errorEmail) {
      setErrorEmail(false);
    }
    Object.keys(active)
      .filter((el) => el === "email")
      .forEach((el) => {
        active[el] = true;
      });
    Object.keys(active)
      .filter((el) => el !== "email")
      .forEach((el) => {
        active[el] = false;
      });

    setActive((prev) => {
      return {
        ...prev,
        email: true,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.name === "" || input.company === "" || input.email === "") {
      handleShow();
    } else {
      localStorage.setItem("name", input.name);
      localStorage.setItem("company", input.company);
      localStorage.setItem("email", input.email);

      const data = {
        uuid: localStorage.getItem("uuid"),
        name: input.name,
        company: input.company,
        email: input.email,
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
      navigate("/q2");
    }
  }

  return (
    <div className="main">
      <div
        className={
          Object.entries(active).filter((el) => el[1] === true).length > 0 &&
          width <= 480
            ? ""
            : "sticky-sub-div"
        }
      >
        <h2 className="percent">0% завершено</h2>
        <div className="progressBarEmpty">
          <div className="progressBarFilled" style={{ width: "0%" }}></div>
        </div>
      </div>
      <ModalAlert show={show} close={handleClose} />

      <Form>
        <Form.Group className="credentials-form m-credentials-form">
          <p className="question-i">
            ВАЖНО. Отвечая на данную секцию вопросов, Вы, тем самым, не даете
            согласие на раскрытие Вашего личного имени. Ответ на данный вопрос
            необходим нам только для предоставления обратной связи.
          </p>
          {errorName ? (
            <p
              style={{
                color: "#db536a",
                fontStyle: "italic",
                fontSize: "12px",
                textAlign: "left",
                width: "100%",
                margin: 0,
              }}
            >
              *Поле должно быть заполнено
            </p>
          ) : (
            ""
          )}
          <Form.Control
            autoComplete="off"
            type="text"
            placeholder="Введите, пожалуйста, Ваше имя и фамилию*"
            name="name"
            value={input.name}
            onChange={handleChange}
            onBlur={handleBlurName}
            onFocus={handleFocusName}
            className="credentials-input m-credentials-input"
            style={{ marginTop: errorName ? 0 : "" }}
          ></Form.Control>
          {errorEmail ? (
            <p
              style={{
                color: "#db536a",
                fontStyle: "italic",
                fontSize: "12px",
                textAlign: "left",
                width: "100%",
                margin: 0,
              }}
            >
              *Поле с электронной почтой должно быть заполнено
            </p>
          ) : (
            ""
          )}

          {validationErrorEmail ? (
            <p
              style={{
                color: "#db536a",
                fontStyle: "italic",
                fontSize: "12px",
                textAlign: "left",
                width: "100%",
                margin: 0,
              }}
            >
              *Неправильно введен адрес электронной почты
            </p>
          ) : (
            ""
          )}

          <Form.Control
            type="text"
            placeholder="Введите, пожалуйста, Ваш адрес электронной почты.*"
            name="email"
            value={input.email}
            onChange={handleChange}
            autoComplete="off"
            onBlur={handleBlurEmail}
            onFocus={handleFocusEmail}
            className="credentials-input m-credentials-input"
            style={{ marginTop: errorEmail || validationErrorEmail ? 0 : "" }}
          ></Form.Control>

          {errorCompany ? (
            <p
              style={{
                color: "#db536a",
                fontStyle: "italic",
                fontSize: "12px",
                textAlign: "left",
                width: "100%",
                margin: 0,
              }}
            >
              *Поле должно быть заполнено
            </p>
          ) : (
            ""
          )}

          <Form.Control
            type="text"
            placeholder="Введите, пожалуйста, название вашей организации и должности.*"
            autoComplete="off"
            name="company"
            value={input.company}
            onChange={handleChange}
            onBlur={handleBlurCompany}
            onFocus={handleFocusCompany}
            className="credentials-input m-credentials-input"
            style={{ marginTop: errorCompany ? 0 : "" }}
          ></Form.Control>
        </Form.Group>

        <br></br>
        <div className="back-next-btns">
          <Button
            variant="secondary"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fas fa-chevron-left back-arrow"></i>
            Назад
          </Button>

          <Button variant="danger" className="next-btn" onClick={handleSubmit}>
            Далее
            <i className="fas fa-chevron-right next-arrow"></i>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Start;
