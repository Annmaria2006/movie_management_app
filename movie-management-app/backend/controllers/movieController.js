
const Movie = require('../models/Movie');

// Get all movies
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//    Add a new movie

const addMovie = async (req, res) => {
    const { movieID, title, director, releaseYear, genre, rating } = req.body;

    if (!movieID || !title || !director || !releaseYear || !genre || !rating) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        // Check if movieID already exists
        const movieExists = await Movie.findOne({ movieID });
        if (movieExists) {
            return res.status(400).json({ message: 'Movie with this ID already exists' });
        }

        const movie = await Movie.create({
            movieID,
            title,
            director,
            releaseYear,
            genre,
            rating,
        });

        res.status(201).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//    Update a movie

const updateMovie = async (req, res) => {
    const { id } = req.params; 
    const { title, director, releaseYear, genre, rating } = req.body;

    try {
        const movie = await Movie.findOneAndUpdate(
            { movieID: id }, // Find by movieID
            { title, director, releaseYear, genre, rating },
            { new: true, runValidators: true } 
        );

        if (!movie) {
            return res.status(404).json({ message: `Movie with ID ${id} not found` });
        }

        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//    Delete a movie

const deleteMovie = async (req, res) => {
    const { id } = req.params; // Using movieID as :id in the route

    try {
        const movie = await Movie.findOneAndDelete({ movieID: id }); // Find and delete by movieID

        if (!movie) {
            return res.status(404).json({ message: `Movie with ID ${id} not found` });
        }

        res.status(200).json({ message: 'Movie removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMovies,
    addMovie,
    updateMovie,
    deleteMovie,
};
