import React, { useContext, useEffect, useState } from 'react';
import { Chela_One, Inter, Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import Card from './Card';
import sample from '../sample.json';
import { NotesContext } from '../contexts/NotesContext';
import { addDoc, collection } from 'firebase/firestore';
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


    const { color, notes } = useContext(NotesContext);

    function formatDate(dateString, format) {
        const options = { day: 'numeric', month: format, year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    useEffect(() => {
        // Get today's date in the desired format after the initial render
        const formattedDate = formatDate(new Date(), 'long');
        setTodayDate(formattedDate);
    }, []);
    
    async function addNotes(e) {

        await addDoc(collection(db, "notes"), {
            id: notes.length + 1,
            body: newNoteBody,
            color: color,
            date: todayDate,
        });
        alert("Added Notes successfully!")
        window.location.reload();

    }


    return (
        <div className={`${raleway.className} w-full h-full flex flex-col p-10`}>
            {/* Header */}
            <div className={`${manrope.className} font-bold text-5xl `}>
                <h1>Notes</h1>
            </div>

            {/* Grid of notes */}
            <div className="grid grid-cols-3 gap-6 mt-5">
                {/* New Card selected by the user */}
                <div
                    className={`${manrope.className} ${color ? `p-10 flex flex-col justify-between ${color} w-[350px] h-[350px] rounded-2xl text-2xl` : 'hidden'
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
                        {
                            newNoteBody && (
                                <div
                                    onClick={() => addNotes()}
                                    className="px-6 py-2  bg-black rounded-lg text-gray-400 transition hover:scale-110 hover:ease-in cursor-pointer hover:duration-150 hover:shadow-xl">
                                    {/* <Image src="/edit.svg" alt="edit icon" height="10" width="10" className="h-5 w-5" /> */}
                                    <h1>Enter</h1>
                                </div>
                            )
                        }

                    </div>
                </div>

                {/* Card */}
                <Card />
            </div>
        </div>
    );
}

export default Main;
