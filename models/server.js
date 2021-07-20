const express = require('express');
const cors = require('cors');
const { bdConnection }  = require('../database/config');

// contra pjqczPLgJePb4mgr

class Server {
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Paths

        this.path = {
            auth      : '/api/auth',
            hospitales: '/api/hospitales',
            medicos   : '/api/medicos',
            search    : '/api/search',
            usuarios  : '/api/usuarios',
            uploads   : '/api/uploads'
        }

        this.conetarDB();

        this.middlewares();

        this.routes();

    }

    // Connect to DB

    async conetarDB() {
        await bdConnection();
    }


    // Middlewares

    middlewares() {
        // CORS 
        this.app.use(cors());

        // Parsear Json
        this.app.use(express.json());
    }


    routes() {
        this.app.use( this.path.auth, require('../routes/auth.route'));
        this.app.use( this.path.hospitales, require('../routes/hospitals.route'));
        this.app.use( this.path.medicos, require('../routes/medicos.route'));
        this.app.use( this.path.search, require('../routes/search.route'));
        this.app.use( this.path.usuarios, require('../routes/user.route'));
        this.app.use( this.path.uploads, require('../routes/uploads.route'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        });
    }
}

module.exports = Server;