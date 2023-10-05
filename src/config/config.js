const { connect } = require('mongoose')

const connectDb = async () => {
    try {        
        console.log(`Base de datos conectada`)
        return await connect('mongodb://localhost:27017/c58070')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDb }

