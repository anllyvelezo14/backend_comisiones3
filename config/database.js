require('dotenv').config();

module.exports = {
    //Configurar BD
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "sasa",
    database: process.env.DB_DATABASE || "db_node_comisiones",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    define: {
        timestamps: false,
        //para claves foráneas
        underscored: true
    },
    //Configurar Seeds
    seederStorage: "sequielize",
    seederStorageTableName: "seeds",

    //Configurar Migrations
    migrationsStorage: "sequelize",
    migrationsStorageTableName: "migrations"
}