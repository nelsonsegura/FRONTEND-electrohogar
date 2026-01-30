import "./Content.css";
import { Card } from "../card/Card";
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { useLocation } from "react-router-dom";

export const Content = () => {
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const selectedCategory = params.get("category"); // ?category=ID
  const onlyOffers = params.get("offers");         // ?offers=true

  useEffect(() => {
    getMoviesAsync();
  }, []);

  const getMoviesAsync = async () => {
    let response = await fetch(API_URL + "movie");
    let data = await response.json();
    setMovies(data);
  };

  // 🔥 FILTRADO
  let filtered = movies;

  // Filtrar por categoría
  if (selectedCategory) {
    filtered = filtered.filter(m => m.category?.id === selectedCategory);
  }

  // Filtrar solo ofertas
  if (onlyOffers) {
    filtered = filtered.filter(m => m.discount && m.discount > 0);
  }

  return (
    <div className="row">
      {filtered.map((movie, idx) => (
        <Card
          key={idx}
          id={movie.id}
          name={movie.name}
          description={movie.description}
          image={
            movie.imageLink || "https://picsum.photos/seed/picsum/200/300"
          }
          price={movie.price}
          discount={movie.discount || 0}
          category={movie.category?.name}
        />
      ))}
    </div>
  );
};
