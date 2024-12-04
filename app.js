import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("./database.sqlite");

const initializeDB = async () =>{
    await dbRun("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, class TEXT)")
};

const users = [
    { name: "John Doe", email: "john.doe@example.com" },
    { name: "Jane Smith", email: "jane.smith@example.com" },
    { name: "Sam Johnson", email: "sam.johnson@example.com" },
];

for (const user of users) {
    await dbRun("INSERT INTO users (name, email) VALUES (?, ?)", [user.name, user.email]);
}

function dbQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) reject(err);
            else resolve(this);
        });
    });
}

export { db, dbQuery, dbRun, initializeDB };