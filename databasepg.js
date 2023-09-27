const { Client } = require("pg");
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "900900",
    database: "test"
})

client.connect();
client.query("select * from users", (err, res) => {
    if (!err) {
        console.log(res.rows);
        flag=true;
    } else {
        console.log(err.message);
        flag = false;
    }
    client.end();
})