import React, { useContext } from 'react';
import { Inter, Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { NotesContext } from '../contexts/NotesContext';

const raleway = Raleway({
    weight: ['400', '700'],
    subsets: ['latin'],
});
const manrope = Manrope({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
});

function Nav() {


    return (<>


        <div className={`${manrope.className} p-10 w-5/6 `}>
            <div className='flex space-x-4 text-black font-normal w-72 px-4 py-2 rounded-lg bg-transparent'>
                <Image
                    src="/search.svg"
                    alt="Search icon"
                    height="10"
                    width="10"
                    className='h-5 w-5'
                />

                <input
                    placeholder="Search notes..."
                    className='bg-transparent placeholder:text-gray-400 outline-none font-medium'
                    type="text"
                />
            </div>
        </div> 

        {/* <Image
            src="/banner.jpg"
            alt="banner"
            height="624"
            width="1028"
            className='h-56 object-cover w-screen'
        />
        <h1 className={`${raleway.className} absolute z-10 p-10  text-7xl font-bold text-gray-600`}>Increase your efficiency 🚀</h1> */}

    </>

    );
}

export default Nav;
