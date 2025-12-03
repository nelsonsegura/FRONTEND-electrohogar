import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL, showMessage } from "../../util/Util";

export const Cmovie = () => {
  const [formData, setFormData] = useState({
    name: "",
    trailerLink: "",
    imageLink: "",
    description: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendMovieApi();
    const title = "";
    let icon = "warning";
    let confirmButtonText = "ERROR";
    if (response.status === true) {
      icon = "success";
      confirmButtonText = "Registro completo";
  }
  const message = response.message;
    showMessage(title, message, icon, confirmButtonText);
  };

  const sendMovieApi = async () => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    };
    let response = await fetch(API_URL + "movie", requestData);
    response = await response.json();
    return response;
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre Pelicula"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Video</Form.Label>
          <Form.Control
            type="text"
            placeholder="link video"
            name="trailerLink"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBirhtDate">
          <Form.Label>Caratula</Form.Label>
          <Form.Control
            type="text"
            placeholder="link caratula"
            name="imageLink"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Descripcion pelicula"
            name="description"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          CREAR PELICULA
        </Button>
      </Form>
    </div>
  );
};
