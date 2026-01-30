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
import { Regadmin } from "./components/regadmin/Regadmin";


import { MovieCreate } from "./components/movie/MovieCreate";
import { MovieEdit } from "./components/movie/MovieEdit";
import { MovieAdminList } from "./components/movie/MovieAdminList";
import { AdminRoute } from "./routes/AdminRoute";

import { AdminDashboard } from "./components/admin/AdminDashboard";

import { AdminClients } from "./components/admin/AdminClients";

import { AdminAdmins } from "./components/admin/AdminAdmins";

import { AdminOrders } from "./components/admin/AdminOrders";

import { Cart } from "./components/cart/Cart";

import { MyOrders } from "./components/orders/MyOrders";

import { MyProfile } from "./components/register/MyProfile";

import { AdminUsers } from "./components/regadmin/AdminUsers";

import { MyProfileAdmin } from "./components/regadmin/MyProfileAdmin";

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
          <Route path="/regadmin" element={<Regadmin />} />

          <Route
            path="/admin/movies"
            element={
              <AdminRoute>
                <MovieAdminList />
              </AdminRoute>
            }
          />

          <Route
            path="/movies/create"
            element={
              <AdminRoute>
                <MovieCreate />
              </AdminRoute>
            }
          />

          <Route
            path="/movies/edit/:id"
            element={
              <AdminRoute>
                <MovieEdit />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="/admin/clientes" element={<AdminRoute><AdminClients /></AdminRoute>} />
          <Route path="/admin/comerciantes" element={<AdminRoute><AdminAdmins /></AdminRoute>} />
          <Route path="/admin/pedidos" element={<AdminRoute><AdminOrders /></AdminRoute>} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrders />
              </AdminRoute>
            }
          />

          <Route path="/mis-pedidos" element={<MyOrders />} />


          <Route path="/perfil" element={<MyProfile />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/profile" element={<MyProfileAdmin />} />



        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
