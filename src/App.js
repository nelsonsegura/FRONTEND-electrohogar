import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Content } from "./components/content/Content";
import Footer from "./components/footer/Footer";

import { Header } from "./components/header/Header";
import { Login } from "./components/login/Login";
import { Movie } from "./components/movie/Movie";
import { NotFound } from "./components/notFound/NotFound";
import { Register } from "./components/register/Register";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Cmovie } from "./components/cmovie/Cmovie";
import Descuentos from './components/descuentos/descuentos';
import Pedidos from './components/pedidos/pedidos';
import Bienvenido from './components/bienvenido/bienvenido';
import Bienvenidos from './components/bienvenidos/bienvenidos';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Content />} />
          <Route path="/" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/cmovie" element={<Cmovie />} />
          <Route path="/descuentos" element={<Descuentos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/bienvenido" element={<Bienvenido />} />
          <Route path="/bienvenidos" element={<Bienvenidos />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
