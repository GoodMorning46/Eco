import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // importez le CSS de Quill
import "./css/Notes.css";

export default function App() {
  const localNotes = localStorage.getItem("notes");
  const [notes, setNotes] = useState(localNotes);

  useEffect(() => {
    if (!localNotes) {
      localStorage.setItem("notes", "");
    }
  }, [localNotes]);

  const handleChange = (value) => {
    localStorage.setItem("notes", value);
    setNotes(value);
  };

  return (
    <div className="notes-container">
      <ReactQuill value={notes} onChange={handleChange} />
    </div>
  );
}
