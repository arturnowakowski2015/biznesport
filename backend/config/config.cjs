require("dotenv").config();

module.exports = {
    development: {
        username: "root",
        password: "interview123",
        database: "interview", // upewnij się, że taka nazwa jest w init.sql
        host: "db",            // ZMIANA: nazwa usługi z docker-compose
        port: 3306,            // ZMIANA: port MySQL
        dialect: "mysql",       // ZMIANA: upewnij się, że jest mysql, a nie postgres
        seederStorage: "sequelize"
    }
};  