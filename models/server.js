const express = require('express');
const cors = require('cors');
const { bdConnection }  = require('../database/config');

// contra pjqczPLgJePb4mgr

class Server {
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.conetarDB();

        this.middlewares();

    }

    // Connect to DB

    async conetarDB() {
        await bdConnection();
    }


    // Middlewares

    middlewares() {
        // CORS 
        this.app.use(cors());
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }
}

module.exports = Server;