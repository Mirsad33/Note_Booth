const express = require ('express')
const fs = require ('fs')
const path = require ('path')
const { v4: uuidv4 } = require ('uuid')

const app = express()
const PORT = '3333'

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// HTML Routes

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// API Routes

app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }

        const notes = JSON.parse(data)
        res.json(notes)
    })
})

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4() //Generate a unique ID for the new note
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }

        const notes = JSON.parse(data)
        notes.push(newNote)
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
            if (err) {
                console.log(err)
                return res.status(500).json({error: 'Internal Server Error'})
            }
            res.json(newNote)
        })
    })
})

// Bonus: DELETE Route
app.delete('/api/notes/:id', (req, res) => {
    const noteID = req.params.id
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error: 'Internal Server Error'})
        }
        let notes = JSON.parse(data)
        notes = notes.filter(note => note.id !== noteId)
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), err => {
            if (err) {
                console.log(err)
                return res.status(500).json({error: 'Internal Server Error'})
            }
            res.status(200).json({message: 'Note deleted successfully'})
        })
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})