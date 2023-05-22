import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./css/Notes.css";

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'color': [] }, { 'background': [] }],
  ['link', 'image'],
];

const Notes = () => {
  let quillInstance = null;

  useEffect(() => {
    quillInstance = new ReactQuill.Quill('#editor', {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    });
    
    const localNotes = localStorage.getItem("notes");
    
    if (localNotes) {
        try {
            const parsedNotes = JSON.parse(localNotes);
            quillInstance.setContents(parsedNotes);
            const firstLineFormat = quillInstance.getFormat(0);
            if (firstLineFormat.header !== 2) {
                quillInstance.formatLine(0, 1, 'header', 2);
            }
        } catch(e) {
            console.error('Error parsing localNotes JSON: ', e);
        }
    } else {
        quillInstance.insertText(0, '\n', 'header', 2);
    }

    quillInstance.on('text-change', function() {
      const contents = quillInstance.getContents();
      localStorage.setItem("notes", JSON.stringify(contents));
    });

  }, []);

  return (
    <div className="notes-container">
      <div id="editor"></div>
      <div className="chevrons">>></div>
    </div>
  );
}

export default Notes;
