import React, { useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([
    { id: 1, text: "Heloo my name is Aayush Sharma" }
  ]);
  const [inputText, setInputText] = useState("");
  const [editId, setEditId] = useState(null);

  // Create or Update Note
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    if (editId !== null) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editId ? { ...note, text: trimmedText } : note
        )
      );
      setEditId(null);
    } else {
      // Create new note
      const newNote = {
        id: Date.now(),
        text: trimmedText
      };
      setNotes([...notes, newNote]);
    }

    setInputText("");
  };

  // Populate textarea for editing
  const handleEdit = (note) => {
    setEditId(note.id);
    setInputText(note.text);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditId(null);
    setInputText("");
  };

  // Delete Note
  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editId === id) {
      setEditId(null);
      setInputText("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">My Notes</h1>

      <form className="note-form" onSubmit={handleSubmit}>
        <textarea
          className="note-textarea"
          placeholder="Write your note"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="form-actions">
          <button type="submit" className="btn">
            {editId !== null ? "Update Note" : "Add Note"}
          </button>
          {editId !== null && (
            <button
              type="button"
              className="btn"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="empty-message">No notes available. Add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <p className="note-text">{note.text}</p>
              <div className="note-actions">
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;