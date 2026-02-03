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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">

          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4 p-md-5">

              <h3 className="text-center mb-2 fw-bold">
                🧑‍💼 Registro de comerciante
              </h3>

              <p className="text-center text-muted mb-4">
                Acceso exclusivo para administradores de la tienda
              </p>

              <Form onSubmit={handleSubmit}>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                      type="text"
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
                    placeholder="correo@empresa.com"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {/* 🔐 CLAVE DE COMERCIANTE */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-danger">
                    Clave de comerciante
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Clave secreta"
                    name="secretKey"
                    onChange={handleChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Esta clave es entregada solo por el administrador del sistema.
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                >
                  REGISTRAR COMERCIANTE
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
