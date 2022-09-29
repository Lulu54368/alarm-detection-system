const dbConfig = 
{
    HOST: process.env.HOST||"localhost",
    USER: process.env.DBUSER||"root",
    PASSWORD: process.env.PASSWORD||"password",
    DB: process.env.DB||"alarm_detection",
    dialect: "mysql", 
pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
}
module.exports = {
    dbConfig
};