import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopMenu.css";
import { API_URL, isAuth, isAdmin } from "../../util/Util";

export const TopMenu = () => {
  const [categories, setCategories] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const getCategoriesAsync = async () => {
    let response = await fetch(API_URL + "category");
    response = await response.json();
    setCategories(response);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      {isAuth() && (
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              {/* =================== CLIENTE =================== */}
              {!isAdmin() && (
                <>
                  <Nav.Link as={Link} to="/bienvenido">
                    Inicio
                  </Nav.Link>

                  <Nav.Link as={Link} to="/movies">
                    Productos
                  </Nav.Link>

                  <NavDropdown title="Categorías">
                    <NavDropdown.Item as={Link} to="/movies">
                      Todas
                    </NavDropdown.Item>
                    {categories.map(c => (
                      <NavDropdown.Item
                        key={c.id}
                        as={Link}
                        to={`/movies?category=${c.id}`}
                      >
                        {c.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>

                  <Nav.Link as={Link} to="/movies?offers=true">
                    🔥 Ofertas
                  </Nav.Link>

                  <Nav.Link as={Link} to="/cart">
                    🛒 Carrito
                  </Nav.Link>

                  <Nav.Link as={Link} to="/mis-pedidos">
                    🧾 Mis pedidos
                  </Nav.Link>

                  <Nav.Link as={Link} to="/perfil">
                    Mi cuenta
                  </Nav.Link>

                  <Nav.Link as={Link} to="/bienvenidos">
                    Contactos
                  </Nav.Link>

                </>
              )}

              {/* =================== ADMIN =================== */}
              {isAdmin() && (
                <>
                  <Nav.Link as={Link} to="/movies">
                    inicio
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/dashboard">
                    📊 Dashboard
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/movies">
                    📦 Productos
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/orders">
                    🚚 Pedidos
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/clientes">
                    👥 Clientes
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/comerciantes">
                    🧑‍💼 Comerciantes
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/users">
                    👤 Usuarios
                  </Nav.Link>

                  <Nav.Link as={Link} to="/admin/profile">
                    Mi perfil admin
                  </Nav.Link>
                </>
              )}

              {/* =================== COMÚN =================== */}
              <Nav.Link onClick={logOut}>
                Logout
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );

};
