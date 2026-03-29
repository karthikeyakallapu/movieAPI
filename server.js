const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const PORT = 3100;
const data = fs.readFileSync("./GlobalMovies.json");
const movies = JSON.parse(data);
app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h2>Welcome to Karthikeya's Movie API</h2>")
})
app.get("/movies", (request, response) => {
    response.send(movies);
});



app.get("/movies/:element", (request, response) => {
    const movieId = request.params.element;
    const movie = movies.find((movie) => movie[movieId]);
    if (movie) {
        response.send(movie[movieId]);
    } else {
        response.status(404).send("Movie not found");
    }
});


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
