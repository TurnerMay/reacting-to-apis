import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [films, setFilm] = useState([]);
  const [people, setPeople] = useState([]);
  const [loadFilms, setLoadFilms] = useState(false);
  const [loadPeople, setLoadPeople] = useState(false);

  const getFilmData = () => {
    fetch("https://ghibliapi.herokuapp.com/Films")
      .then((res) => res.json())
      .then((allFilms) => setFilm(allFilms));
    setLoadFilms(true);
  };

  const getPeopleData = () => {
    fetch("https://ghibliapi.herokuapp.com/People")
      .then((res) => res.json())
      .then((allPeople) => setPeople(allPeople));
    setLoadPeople(true);
    setLoadFilms(false);
  };

  if (loadFilms) {
    return (
      <>
        <header>
          <button className="bg-primary mx-2 my-1" onClick={() => getFilmData()}>
            Load Films
          </button>
          <button className="bg-primary mx-2 my-1" onClick={() => getPeopleData()}>
            Load People
          </button>
        </header>
        <main className="container">
          <section className="row justify-content-center mt-5">
            {films.map((film) => (
              <div className="col-md-6" key={`user-card-$${film.id}`}>
                <div className="card shadow my-2">
                  <div className="card-body">
                    <h4 className="card-title">{film.title}</h4>
                    <p className="card-subtitle text-muted">{film.director}</p>
                    <p className="card-text">{film.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </>
    );
  } else if (loadPeople) {
    return (
      <>
        <header>
          <button className="bg-primary mx-2 my-1" onClick={() => getFilmData()}>
            Load Films
          </button>
          <button className="bg-primary mx-2 my-1" onClick={() => getPeopleData()}>
            Load People
          </button>
        </header>
        <main className="container">
          <section className="row justify-content-center mt-5">
            {people.map((pers) => (
              <div className="col-md-6" key={`user-card-$${pers.id}`}>
                <div className="card shadow my-2">
                  <div className="card-body">
                    <h4 className="card-title">{pers.name}</h4>
                    <p className="card-subtitle text-muted">{pers.gender}</p>
                    <p className="card-text">{pers.age}</p>
                    <p className="card-text">
                      <a href={pers.url} target="blank">
                        <button id="smol">Json</button>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </main>
      </>
    );
  } else {
    return (
      <header>
        <button className="bg-primary mx-2 my-1" onClick={() => getFilmData()}>
          Load Films
        </button>
        <button className="bg-primary mx-2 my-1" onClick={() => getPeopleData()}>
          Load People
        </button>
      </header>
    );
  }
};

export default App;
