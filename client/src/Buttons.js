import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Buttons({ click }) {
  const navigate = useNavigate();

  return (
    <div className="back-next-btns">
      <Button
        variant="secondary"
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-chevron-left back-arrow"></i>
        Назад
      </Button>

      <Button variant="danger" className="next-btn" onClick={click}>
        Далее
        <i className="fas fa-chevron-right next-arrow"></i>
      </Button>
    </div>
  );
}
