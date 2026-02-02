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
          navigate("/movies/create");
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
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="col-11 col-sm-8 col-md-5 col-lg-4 col-xl-3">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-4">

            <h3 className="text-center fw-bold mb-3">
              🔐 Iniciar sesión
            </h3>

            <p className="text-center text-muted mb-4">
              Accede a tu cuenta para continuar
            </p>

            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="correo@ejemplo.com"
                  name="user"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Tipo de cuenta</Form.Label>
                <Form.Select name="tipo" onChange={handleChange}>
                  <option value="client">Cliente</option>
                  <option value="admin">Comerciante</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                Entrar
              </Button>
            </Form>

            <hr className="my-4" />

            <div className="text-center small">
              <div>
                ¿No tienes cuenta?
                <Link to="/register" className="ms-1">
                  Regístrate
                </Link>
              </div>

              <div className="mt-2">
                ¿Eres comerciante?
                <Link to="/regadmin" className="ms-1">
                  Crear cuenta
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );

};
