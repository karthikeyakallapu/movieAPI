const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3100;
const publicDirPath = path.join(__dirname, "public");
const movies = require("./GlobalMovies.json");

app.use(express.static(publicDirPath));
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Welcome to Karthikeya's Movie API</h2>");
});

app.get("/movies", (request, response) => {
    response.send(movies);
});

app.get("/movies/:element", (request, response) => {
    const movieId = request.params.element;
    const movie = movies.find((movieItem) => movieItem[movieId]);

    if (movie) {
        response.send(movie[movieId]);
        return;
    }

    response.status(404).send("Movie not found");
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
}

module.exports = app;
