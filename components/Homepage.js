"use client"

import React, { useState } from 'react'
import { Inter, Manrope, Raleway } from 'next/font/google';
import Nav from './Nav';
import Left from './Left';
import Main from './Main';
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

function Homepage() {

    const [color, setColor] = useState("")
    const [notes, setNotes] = useState([])


    return (
        <div className=' h-screen flex '>
            <NotesContext.Provider value={{ color, setColor, notes, setNotes }}>
                <Left />
                <div className='flex flex-col space-y-2'>
                    <Nav />
                    <Main />
                </div>
            </NotesContext.Provider>


        </div>
    )
}

export default Homepage