import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./Start";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";
import Question5 from "./Question5";
import Question6 from "./Question6";
import Question7 from "./Question7";
import Question8 from "./Question8";
import Question9 from "./Question9";
import Question10 from "./Question10";
import Question11 from "./Question11";
import Question12 from "./Question12";
import Question13 from "./Question13";
import Question14 from "./Question14";
import Question15 from "./Question15";
import Question16 from "./Question16";
import Question17 from "./Question17";
import Question18 from "./Question18";
import Question19 from "./Question19";
import Question20 from "./Question20";
import Question21 from "./Question21";
import Question22 from "./Question22";
import Question23 from "./Question23";
import Question24 from "./Question24";
import Question25 from "./Question25";
import Question26 from "./Question26";
import Question27 from "./Question27";
import Question28 from "./Question28";
import Finish from "./Finish";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/start" element={<Start />} />
      <Route path="/q1" element={<Question1 />} />
      <Route path="/q2" element={<Question2 />} />
      <Route path="/q3" element={<Question3 />} />
      <Route path="/q4" element={<Question4 />} />
      <Route path="/q5" element={<Question5 />} />
      <Route path="/q6" element={<Question6 />} />
      <Route path="/q7" element={<Question7 />} />
      <Route path="/q8" element={<Question8 />} />
      <Route path="/q9" element={<Question9 />} />
      <Route path="/q10" element={<Question10 />} />
      <Route path="/q11" element={<Question11 />} />
      <Route path="/q12" element={<Question12 />} />
      <Route path="/q13" element={<Question13 />} />
      <Route path="/q14" element={<Question14 />} />
      <Route path="/q15" element={<Question15 />} />
      <Route path="/q16" element={<Question16 />} />
      <Route path="/q17" element={<Question17 />} />
      <Route path="/q18" element={<Question18 />} />
      <Route path="/q19" element={<Question19 />} />
      <Route path="/q20" element={<Question20 />} />
      <Route path="/q21" element={<Question21 />} />
      <Route path="/q22" element={<Question22 />} />
      <Route path="/q23" element={<Question23 />} />
      <Route path="/q24" element={<Question24 />} />
      <Route path="/q25" element={<Question25 />} />
      <Route path="/q26" element={<Question26 />} />
      <Route path="/q27" element={<Question27 />} />
      <Route path="/q28" element={<Question28 />} />
      <Route path="/finish" element={<Finish />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
