import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL, showMessage } from "../../util/Util";

export const Regadmin = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    birthDate: "",
    phone: "",
    secretKey: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await sendAdminApi();

      let icon = "warning";
      let confirmButtonText = "Vuelva a verificar";

      if (response.status === true) {
        icon = "success";
        confirmButtonText = "Registro completado";
      }

      showMessage("", response.message, icon, confirmButtonText);

    } catch (error) {
      showMessage(
        "Error",
        "Error de conexión con el servidor",
        "error",
        "Reintentar"
      );
    }
  };

  // 🔴 AQUÍ VA EXACTAMENTE LO QUE PEDÍAS
  const sendAdminApi = async () => {
    const response = await fetch(API_URL + "admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        secretKey: formData.secretKey, // 🔐 CLAVE
      }),
    });

    return await response.json();
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>Nombres</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de nacimiento</Form.Label>
          <Form.Control
            type="date"
            name="birthDate"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Celular</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 🔐 CLAVE DE COMERCIANTE */}
        <Form.Group className="mb-3">
          <Form.Label>Clave de comerciante</Form.Label>
          <Form.Control
            type="password"
            name="secretKey"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          REGISTRARSE
        </Button>
      </Form>

      <div className="mt-3 text-center">
        <Link to="/">Ya tengo una cuenta</Link>
      </div>
    </div>
  );
};
