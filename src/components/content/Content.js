import "./Content.css";

import { Card } from "../card/Card";
import { useEffect, useState } from "react";
import { API_URL } from "../../util/Util";
import { useLocation } from "react-router-dom";



export const Content = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //getMovies();
    getMoviesAsync();
  }, []);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("category");


  const getMovies = () => {
    console.log(1);
    fetch(API_URL + "movie")
      .then((response) => response.json())
      .then((response) => {
        console.log(`2`, 2);
        //console.log(response);
        setMovies(response);
      });
    console.log(`3`, 3);
  };

  const getMoviesAsync = async () => {
    let response = await fetch(API_URL + "movie");
    response = await response.json();
    setMovies(response);
  };

  return (
    <div className="row">
      {movies
        .filter(movie => {
          // Si no hay categoría seleccionada → mostrar todo
          if (!selectedCategory) return true;

          // Si el producto no tiene categoría → no mostrar
          if (!movie.category) return false;

          // Comparar con la categoría seleccionada
          return movie.category.id === selectedCategory;
        })
        .map((movie, idx) => (
          <Card
            key={idx}
            name={movie.name}
            description={
              !movie.description ? "No hay descripción" : movie.description
            }
            staffList={movie.staffList}
            image={
              !movie.imageLink
                ? "https://picsum.photos/seed/picsum/200/300"
                : movie.imageLink
            }
            id={movie.id}
            price={movie.price}
            category={movie.category?.name}
          />
        ))}
    </div>
  );
};
