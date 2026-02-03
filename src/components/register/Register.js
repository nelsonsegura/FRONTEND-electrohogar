import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { API_URL, showMessage } from "../../util/Util";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    lastName: "",
    birthDate: "",
    phone: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await sendClientApi();
    const title = "";
    let icon = "warning";
    let confirmButtonText = "vuelva a verifique";
    if (response.status === true) {
      icon = "success";
      confirmButtonText = "Registro completado";
    }
    const message = response.message;
    showMessage(title, message, icon, confirmButtonText);
  };

  const sendClientApi = async () => {
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json",
      },
    };
    let response = await fetch(API_URL + "client", requestData);
    response = await response.json();
    return response;
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              <h3 className="text-center mb-4 fw-bold">
                📝 Crear cuenta
              </h3>

              <Form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nombres"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Apellidos"
                      name="lastName"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Label>Fecha de nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="birthDate"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="3001234567"
                      name="phone"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="correo@ejemplo.com"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Nunca compartiremos tu correo.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                >
                  REGISTRARSE
                </Button>
              </Form>

              <div className="text-center mt-4">
                <span className="text-muted">¿Ya tienes cuenta?</span><br />
                <Link to="/" className="fw-bold">
                  Iniciar sesión
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );

};
