const express = require('express');
const app = express();
app.listen(3000);
// app.use((req,res,next) => {
//     console.log("<h1> trying out express middleware</h1>")
//     express.urlencoded({extended: false})
//     express.json();
//     next();
// });
app.use(
    express.urlencoded({ extended: false })
);
app.use(express.json());
app.get('/', (req, res) => {

    res.send("getting root")
});

app.get('/profile', (req, res) => {

    res.send("getting profile")
});
app.post('/profile', (req, res) => {
    console.log(req.body)
    
    res.send("Success")
});