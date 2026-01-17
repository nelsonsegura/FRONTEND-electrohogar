import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";

import { API_URL, showMessage } from "../../util/Util";

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("authData")) {
      navigate("/movies");
    }
  };

  const [formData, setFormData] = useState({
    user: "",
    password: "",
    tipo: "client", // client | admin
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await sendAuthApi();

      // 🔐 VALIDACIÓN FUERTE DE ROL
      if (response && response.token && response.role === formData.tipo) {

        localStorage.setItem("authData", JSON.stringify(response));

        if (response.role === "client") {
          navigate("/movies");
        } else {
          navigate("/dashboard-admin");
        }

      } else {
        showMessage(
          "Error",
          "Credenciales no válidas",
          "error",
          "Reintentar"
        );
      }

    } catch (error) {
      showMessage(
        "Error",
        "Error de conexión con el servidor",
        "error"
      );
    }
  };

  const sendAuthApi = async () => {
    const response = await fetch(API_URL + "auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: formData.user,
        password: formData.password,
        role: formData.tipo,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas");
    }

    return await response.json();
  };

  return (
    <div className="row justify-content-center">
      <div className="col-8 col-sm-8 col-md-4 col-lg-3">
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su email"
              name="user"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese su contraseña"
              name="password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de cuenta</Form.Label>
            <Form.Select name="tipo" onChange={handleChange}>
              <option value="client">Cliente</option>
              <option value="admin">Comerciante</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            INGRESAR
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <Link to="/register">Registro cliente</Link>
          <br />
          <Link to="/regadmin">Registro comerciante</Link>
        </div>
      </div>
    </div>
  );
};
