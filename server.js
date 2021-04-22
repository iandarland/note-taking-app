const { json } = require('express');
const express = require('express');
const { fstat } = require('fs');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./db/db.json');
// const fs = require('fs')
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) =>{
    return res.json(db)
})

app.post('/api/notes', (req,res) => {
    const newNote = req.body
    newNote.id = Math.floor((Math.random() * 100) + 1)
    db.push(newNote)
    console.log(db)
    return res.json(newNote)

})

app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id
    for(var i = 0; i < db.length; i++) {
        if(db[i].id == id) {
            db.splice(i, 1);
            break;
        }
    }
    return res.json(db)
  });

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

