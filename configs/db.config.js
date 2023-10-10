/**
 * This file have database related configuration
 */
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "MOHOR321",
    DB: "customercomplainsystem",
    dialect: "mysql",
    pool: {
        max: 5, // Maximum connection possible at any time = 5 at peak load
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}