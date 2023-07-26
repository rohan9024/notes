import React, { useContext, useEffect, useState } from 'react';
import { Inter, Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { NotesContext } from '../contexts/NotesContext';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const inter = Inter({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

function Card({ notes, currentPage, notesPerPage }) {
    const [submitted, setSubmitted] = useState(false);


    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedNoteBody, setEditedNoteBody] = useState('');


    const handleEditClick = (noteId, noteBody) => {
        setEditingNoteId(noteId);
        setEditedNoteBody(noteBody);
    };

    const handleEditChange = (event) => {
        setEditedNoteBody(event.target.value);
    };

    const handleEditSave = async () => {
        const noteToUpdate = notes.find((note) => note.id === editingNoteId);
        if (noteToUpdate && editedNoteBody !== noteToUpdate.body) {
            await updateDoc(doc(db, 'notes', noteToUpdate.id), {
                body: editedNoteBody,
            });
            setNotes((prevNotes) =>
                prevNotes.map((note) =>
                    note.id === editingNoteId ? { ...note, body: editedNoteBody } : note
                )
            );
        }
        setEditingNoteId(null);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleEditSave();
        }
    };

    const handleBlur = () => {
        handleEditSave();
    };


 
    return (
        <>
            {currentNotes.map((singleNote) => (
                <div
                    key={singleNote.id}
                    className={`${manrope.className} shadow-xl p-10 flex flex-col justify-between w-[350px] h-[350px] ${singleNote.color} rounded-2xl text-2xl`}
                >
                    {editingNoteId === singleNote.id ? (
                        <input
                            type="text"
                            value={editedNoteBody}
                            onChange={handleEditChange}
                            onKeyPress={handleKeyPress}
                            onBlur={handleBlur}
                            autoFocus
                            className='bg-transparent outline-none'
                        />
                    ) : (
                        <div className="font-medium text-gray-800">
                            <h1>{singleNote.body}</h1>
                        </div>
                    )}

                    <div className="flex justify-between items-center text-xl text-gray-800">
                        <h1>{singleNote.date}</h1>

                        <div
                            onClick={() => handleEditClick(singleNote.id, singleNote.body)}
                            className="p-3 bg-black rounded-full cursor-pointer"
                        >
                            <Image
                                src="/edit.svg"
                                alt="edit icon"
                                height="10"
                                width="10"
                                className="h-5 w-5"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Card;
