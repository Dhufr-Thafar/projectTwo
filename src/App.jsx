import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CarCard from "./components/CarCard";
import { CarContext } from "./context/CarContext";

function App() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const { cars, dispatch } = useContext(CarContext);
  const [models, setModels] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/cars/models").then(function (response) {
      setModels(response.data.result);
    });
  }, []);

  // const deleteCarById = (id) => {
  //   setCars(cars.filter((car) => car.id != id));
  // };
  const formSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/cars", {
      make: make,
      model: model,
    });
    setMake ("");
    setModel ("");
    // setCars([...cars, response.data.result]);
    dispatch({ type: "addCar", payload: response.data.result });
  };
  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={formSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Make</Form.Label>
              <Form.Select onChange={(e) => setMake(e.target.value)}>
                {models.map((model) => {
                  return <option value={model}>{model}</option>;
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Model</Form.Label>
              <Form.Control
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Row>
        <Row>
          {cars.map((car) => (
            <CarCard {...car}></CarCard>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
