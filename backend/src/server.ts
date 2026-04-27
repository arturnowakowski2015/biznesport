import express from "express";
import cors from "cors";
import { Sequelize } from "sequelize";
import { Message, initMessageModel } from "./models/message"; // upewnij się co do nazwy funkcji
import { createMessage, deleteMessage, updateMessage } from "./controllers/messagesController";

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
const sequelize = new Sequelize("interview", "root", "interview123", {
    host: "db",      // nazwa usługi z docker-compose
    dialect: "mysql",
    port: 3306
});

initMessageModel(sequelize);

app.get("/api/messages", async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error: any) {
        console.error("BŁĄD BAZY:", error.message);
        res.status(500).json({ error: error.message });
    }
});
app.delete("/api/messages/:id", deleteMessage);


app.put("/api/messages/:id", updateMessage);
app.post("/api/messages", createMessage);

const PORT = 8080;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend działa na porcie ${PORT}`);
});
