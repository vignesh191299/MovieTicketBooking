import React, { useState } from "react";
import { useEffect } from "react";

const MovieTicketBookingComponent = () => {
  const movieOptions = [
    { title: "Titanic (200)", price: 200 },
    { title: "Avatar (150)", price: 150 },
    { title: "The Dark Knight (250)", price: 250 },
  ];
  const [movies, setMovies] = useState([
    { id: 1, title: "Titanic (200)", price: 200, occupiedSeats: [1, 2, 3] },
    { id: 2, title: "Avatar (150)", price: 150, occupiedSeats: [4, 5, 6] },
    {id: 3,  title: "The Dark Knight (250)",price: 250,occupiedSeats: [7, 8, 9]},
  ]);

  const [selectedMovie, setSelectedMovie] = useState(movies[0]?.title || "");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setSelectedMovie(movies[0]?.title);
  }, []);

  const handleMovieChange = (e) => {
    setSelectedMovie(e.target.value);
    setSelectedSeats([]);
    setTotalPrice(0);
  };

  const handleSeatChange = async (seat) => {
    const isSeatOccupied = movies.some(
      (movie) =>
        movie.title === selectedMovie && movie.occupiedSeats.includes(seat)
    );
    if (isSeatOccupied) {
      return;
    }
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      await setSelectedSeats([...selectedSeats, seat]);
    } else {
      const newSeats = [...selectedSeats];
      newSeats.splice(index, 1);
      await setSelectedSeats(newSeats);
    }
  };

  const isSeatSelected = (seat) => {
    return selectedSeats.includes(seat);
  };

  const calculateTotalPrice = async () => {
    const selectedMovieData = movies.find(
      (movie) => movie.title === selectedMovie
    );
    const pricePerSeat = selectedMovieData ? selectedMovieData.price : 0;
    const totalPrice = selectedSeats.length * pricePerSeat;
    await setTotalPrice(totalPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSeats, selectedMovie]);

  const handleBookButtonClick = () => {
    if (selectedMovie && selectedSeats.length > 0) {
      setMovies((prevMovies) => {
        return prevMovies.map((movie) => {
          if (movie.title === selectedMovie) {
            return {
              ...movie,
              occupiedSeats: [...movie.occupiedSeats, ...selectedSeats],
            };
          }
          return movie;
        });
      });
      setSelectedSeats([]);
    }
  };

  return (
    <div className="container mx-auto mt-8 w-80">
      <h1 className="text-2xl font-bold mb-4">Movie Ticket Booking</h1>
      <div className="mb-4">
        <label htmlFor="movie" className="mr-2">
          Select A Movie:
        </label>
        <select
          id="movie"
          className="p-2 border rounded"
          onChange={handleMovieChange}
          value={selectedMovie}
        >
          {movies.map((movie) => (
            <option key={movie.title} value={movie.title}>
              {movie.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center rounded bg-gray-300 gap-4 mb-6">
        <div className="flex items-center p-2">
          <div className="w-4 h-4 mr-2 bg-white border"></div>
          <span>N/A</span>
        </div>
        <div className="flex items-center p-2">
          <div className="w-4 h-4 mr-2 bg-green-500"></div>
          <span>Selected</span>
        </div>

        <div className="flex items-center p-2">
          <div className="w-4 h-4 mr-2 bg-black"></div>
          <span>Occupied</span>
        </div>
      </div>
      <div className="grid grid-cols-8 bg-gray-300 rounded  gap-4 p-2">
        {[...Array(40)].map((_, index) => (
          <div
            key={index + 1}
            className={`p-2 border cursor-pointer ${
              isSeatSelected(index + 1)
                ? "bg-green-500"
                : movies.some(
                    (movie) =>
                      movie.title === selectedMovie &&
                      movie.occupiedSeats.includes(index + 1)
                  )
                ? "bg-black text-white"
                : "bg-white"
            }`}
            onClick={() => handleSeatChange(index + 1)}
          ></div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <p>
          you have selected {selectedSeats.length} Seats for a price of $
          {totalPrice}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleBookButtonClick()}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieTicketBookingComponent;
