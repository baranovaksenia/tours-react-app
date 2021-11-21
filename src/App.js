import { set } from "mongoose";
import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const removeTour = (id) => {
    let newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const tours = await response.json();
      setIsLoading(false);
      setTours(tours);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">No tours left</div>
        <button className="btn" onClick={() => fetchTours()}>
          refresh
        </button>
      </main>
    );
  }

  return (
    <main>
      <section>
        <Tours tours={tours} removeTour={removeTour} />
      </section>
    </main>
  );
}

export default App;
