import React, { useState } from 'react';
import "./css/Notes.css"

export default function App() {
    const localNotes = localStorage.getItem("notes");
    const [notes, setNotes] = useState(localNotes);
  
    const handleChange = e => {
      localStorage.setItem("notes", e.target.value);
      setNotes(e.target.value);
    };
  
    return (
      <form>
        <label for="pad">
            <textarea
                rows="10"
                placeholder="Ajouter une note"
                name="pad"
                value={notes}
                onChange={handleChange}
            />
        </label>
      </form>
    );
  }