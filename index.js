import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL_RANDOM = "https://dog.ceo/api/breeds/image/random";
const API_URL_LIST = "https://dog.ceo/api/breeds/list/all";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res)=> {
    try {
        const breedsResult = await axios.get(API_URL_LIST);
        const breeds = Object.keys(breedsResult.data.message);

        const randomDog = await axios.get(API_URL_RANDOM);
        res.render("index.ejs", { imageUrl: randomDog.data.message, breeds});
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Ooops,something is not right...");
    }
});

app.post("/breed", async (req, res) => {
    const breed = req.body.breed;
    try {
        const imageResponse = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`);
        const breedsResponse = await axios.get(API_URL_LIST );  //repopulate the breed dropdown
        const breeds = Object.keys(breedsResponse.data.message);

        res.render("index.ejs", {imageUrl: imageResponse.data.message, breeds });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Ooops,something is not right...");
    }
});
  

app.listen(port, () =>{
    console.log(`The server is running on port ${port}.`);
});
