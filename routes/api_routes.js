const express = require("express");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();

const dbdata = path.join(__dirname, "../db/db.json");

router.get("/notes", (req, res) => {
  fs.readFile(dbdata, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const notes = JSON.parse(data);
    res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  const dbPost = JSON.parse(fs.readFileSync(dbdata).toString());
  const noteData = req.body;
  noteData.id = Date.now();
  dbPost.push(noteData);

  fs.writeFile(dbdata, JSON.stringify(dbPost), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(noteData);
  });
});

router.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(dbdata)
  const data = fs.readFileSync(dbdata, 'utf8');
  const notes = JSON.parse(data);
  console.log(notes);
  const note = notes.filter((note) => note.id != noteId);
  console.log(note);
    fs.writeFile(dbdata, JSON.stringify(note), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  });
});

async function data() {
    const mirsad = await fs.readFile(dbdata, 'utf8')
    return JSON.parse(mirsad)}

module.exports = router;

