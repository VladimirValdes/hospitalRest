const moongose = require('mongoose');

const bdConnection = async() => {
    try {
        await moongose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('DataBase Online');

    } catch (error) {
            console.log(error);
            throw new Error('There is a error in the Connection');
    }
}

module.exports = {
    bdConnection
}