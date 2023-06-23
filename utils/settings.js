import * as SQLite from "expo-sqlite";

const settingsDB = SQLite.openDatabase("settings.db");

function setupDB() {
  // TODO REMOVE IN PRODUCTION
  settingsDB.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS settings_numbers `);
  });

  settingsDB.transaction((tx) => {
    tx.executeSql(`DROP TABLE IF EXISTS settings_strings `);
  });

  settingsDB.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS settings_strings (
        id TEXT PRIMARY KEY UNIQUE,
        value TEXT NOT NULL
        );`
    );
  });

  settingsDB.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS settings_numbers (
        id TEXT PRIMARY KEY UNIQUE,
        value INTEGER NOT NULL
        );`
    );
  });

  settingsDB.transaction((tx) => {
    tx.executeSql(
      "INSERT OR IGNORE INTO settings_numbers(id, value) VALUES (?, ?)",
      ["settingNumPhrases", 10]
    );
  });

  settingsDB.transaction((tx) => {
    tx.executeSql(
      "INSERT OR IGNORE INTO settings_numbers(id, value) VALUES (?, ?)",
      ["settingTimeSeconds", 180]
    );
  });
}

setupDB();

const settings = {
  getString: (key) => {
    return new Promise((resolve, reject) => {
      settingsDB.transaction((tx) => {
        tx.executeSql(
          "SELECT value FROM settings_strings WHERE id = ?",
          [key],
          (_, results) => {
            if (results.rows.length === 0) {
              resolve(null);
            } else {
              resolve(results.rows._array[0]["value"]);
            }
          },
          (error) => {
            console.log("Query error:", error);
            reject(error);
          }
        );
      });
    });
  },

  setString: (key, value) => {
    return new Promise((resolve, reject) => {
      settingsDB.transaction((tx) => {
        tx.executeSql(
          "UPDATE settings_strings SET value = ? WHERE id = ?",
          [value, key],
          (_, results) => {
            resolve();
          },
          (error) => {
            console.log("Query error:", error);
            reject(error);
          }
        );
      });
    });
  },
  getNumber: (key) => {
    return new Promise((resolve, reject) => {
      settingsDB.transaction((tx) => {
        tx.executeSql(
          "SELECT value FROM settings_numbers WHERE id = ?",
          [key],
          (_, results) => {
            console.log(results.rows);
            if (results.rows.length === 0) {
              resolve(null);
            } else {
              resolve(results.rows._array[0]["value"]);
            }
          },
          (error) => {
            console.log("Query error:", error);
            reject(error)
          }
        );
      });
    });
  },
  setNumber: (key, value) => {
    console.log(value);
    return new Promise((resolve, reject) => {
      settingsDB.transaction((tx) => {
        tx.executeSql(
          "UPDATE settings_numbers SET value = ? WHERE id = ?;",
          [value, key],
          (_, results) => {
            resolve();
          }
        );
      });
    });
  },
};

export default settings;
