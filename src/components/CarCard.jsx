import { useContext } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { CarContext } from "../context/CarContext";

export default function CarCard({ id, make, model, deleteCarById }) {
  const { dispatch } = useContext(CarContext);
  const onDeleteclick = async () => {
    const response = await axios.delete(`http://localhost:3000/cars/${id}`);
    //  deleteCarById(id);
    dispatch({ type: "deleteById", payload: id });
  };
  return (
    <Col sm key={id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22287%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20287%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_192ffdfd15e%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_192ffdfd15e%22%3E%3Crect%20width%3D%22287%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.6875%22%20y%3D%2296.20000038146972%22%3E287x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        />
        <Card.Body>
          <Card.Title>{make}</Card.Title>
          <Card.Text>{model}</Card.Text>
          <Button variant="primary">Update</Button>
          <Button variant="danger" onClick={onDeleteclick}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
