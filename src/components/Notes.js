import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Quill from 'quill';
import "react-quill/dist/quill.snow.css"; // importez le CSS de Quill
import "./css/Notes.css";

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'align': [] }],
  ['bold', 'italic', 'underline', 'strike'], // Les options de base sont déjà là
  [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Listes
  [{ 'color': [] }, { 'background': [] }], // Couleurs
  ['link', 'image'], // Liens, images et vidéos
];

const quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: 'snow',
});

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
      <ReactQuill value={notes} onChange={handleChange} modules={{ toolbar: toolbarOptions }} />
    </div>
  );
}
