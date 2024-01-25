import 'dotenv/config'
import express from "express"
import { initializeDatabase } from "./src/config/mongoConnect";

initializeDatabase();

const app = express();
const port = process.env.PORT;
app.use(express.json());


app.listen(port, () => {
    console.log(`Servidor ouvindo a porta ${port}`);
})