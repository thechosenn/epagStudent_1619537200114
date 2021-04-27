// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_epagStudent_db";
import UserModel from "../models/EpagStudent_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.epagStudent_db.host +
        ":" +
        properties.epagStudent_db.port +
        "//" +
        properties.epagStudent_db.user +
        "@" +
        properties.epagStudent_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.epagStudent_db.name,
      properties.epagStudent_db.user,
      properties.epagStudent_db.password,
      {
        host: properties.epagStudent_db.host,
        dialect: properties.epagStudent_db.dialect,
        port: properties.epagStudent_db.port,
        logging: false
      }
    );
    this.dbConnection_epagStudent_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_epagStudent_db;
  }
}

export default new Database();
