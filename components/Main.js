import React, { useContext, useEffect, useState } from 'react';
import { Chela_One, Inter, Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import Card from './Card';
import { NotesContext } from '../contexts/NotesContext';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

function Main() {
    const [todayDate, setTodayDate] = useState('');
    const [newNoteBody, setNewNoteBody] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { notes, setNotes, color } = useContext(NotesContext);
    const [searchQuery, setSearchQuery] = useState('');

    function formatDate(dateString, format) {
        const options = { day: 'numeric', month: format, year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        // Get today's date in the desired format after the initial render
        const formattedDate = formatDate(new Date(), 'long');
        setTodayDate(formattedDate);
    }, []);


    useEffect(() => {
        if (!submitted) {
            const fetchNotes = async () => {
                const querySnapshot = await getDocs(collection(db, 'notes'));
                querySnapshot.forEach((doc) => {
                    setNotes((note) => [
                        ...note,
                        {
                            id: doc.id,
                            body: doc.data().body,
                            color: doc.data().color,
                            date: doc.data().date,
                        },
                    ]);
                    console.log(doc.id, ' => ', doc.data());
                });
            };

            fetchNotes();
            setSubmitted(true);
        }
    }, []);
    async function addNotes(e) {
        await addDoc(collection(db, 'notes'), {
            id: notes.length + 1,
            body: newNoteBody,
            color: color,
            date: todayDate,
        });
        alert('Added Notes successfully!');
        setNewNoteBody('');
    }

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const notesPerPage = 6;
    const indexOfLastNote = currentPage * notesPerPage;
    const indexOfFirstNote = indexOfLastNote - notesPerPage;
    const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

    const totalPages = Math.ceil(notes.length / notesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className={`${raleway.className} w-full h-full flex flex-col p-10`}>
            {/* Header */}
            <div className={`${manrope.className} flex justify-between items-center mx-10 font-bold text-5xl `}>
                <h1>Notes</h1>

                {/* Pagination Controls */}
                <div className="flex justify-center space-x-12 text-xl">
                    <button
                        onClick={handlePrevPage}
                        className="px-10 py-4  bg-black rounded-lg text-gray-300 transition hover:scale-110 hover:ease-in cursor-pointer hover:duration-150 hover:shadow-xl"
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="px-10 py-4  bg-black rounded-lg text-gray-300 transition hover:scale-110 hover:ease-in cursor-pointer hover:duration-150 hover:shadow-xl"
                    >
                        Next
                    </button>
                </div>
            </div>


            {/* Grid of notes */}
            <div className="grid grid-cols-3 gap-6 mt-5">
                {/* New Card selected by the user */}
                <div
                    className={`${manrope.className} ${color
                        ? `p-10 flex flex-col justify-between ${color} w-[350px] h-[350px] rounded-2xl text-2xl`
                        : 'hidden'
                        }`}
                >
                    <div className="font-medium text-gray-800">
                        <input
                            placeholder="Type your note here..."
                            className="bg-transparent placeholder:text-gray-600 outline-none font-medium"
                            type="text"
                            onChange={(e) => setNewNoteBody(e.target.value)}
                            value={newNoteBody}
                        />
                    </div>

                    <div className="flex justify-between items-center text-xl text-gray-800">
                        <h1>{todayDate}</h1>
                        {newNoteBody && (
                            <div
                                onClick={() => addNotes()}
                                className="px-6 py-2  bg-black rounded-lg text-gray-400 transition hover:scale-110 hover:ease-in cursor-pointer hover:duration-150 hover:shadow-xl"
                            >
                                <h1>Enter</h1>
                            </div>
                        )}
                    </div>
                </div>

                {/* Card */}
                <Card
                    notes={notes}
                    currentPage={currentPage}
                    notesPerPage={notesPerPage} />
            </div>


        </div>
    );
}

export default Main;
