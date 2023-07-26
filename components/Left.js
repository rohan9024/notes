"use client"
import React, { useContext, useState } from 'react'
import { Inter, Manrope, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from "framer-motion"
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


const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};
function Left() {

    const [open, setOpen] = useState(false);
    const { setColor } = useContext(NotesContext);


    return (
        <div className={`${raleway.className} w-1/6 h-[1100px] text-left font-normal text-3xl p-10 border-r-2 border-gray-300 space-y-24`}>
            <div className={`${manrope.className} font-medium text-3xl `}>
                <h1>NotesSync</h1>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <motion.div
                    onClick={() => {
                        open ? setOpen(false) : setOpen(true)
                    }
                    }
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ rotate: 360 }}
                    // animate={{ rotate: 360 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className='p-5 bg-black rounded-full shadow-lg' >
                    <Image
                        src="/add.svg"
                        alt="add icon"
                        height="10"
                        width="10"
                        className='h-5 w-5'
                    />
                </motion.div>


                <motion.nav
                    initial={false}
                    animate={open ? "open" : "closed"}
                    className={open ? "flex justify-center items-center" : "hidden"}
                >
                    <motion.ul
                        variants={{
                            open: {
                                clipPath: "inset(0% 0% 0% 0% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.7,
                                    delayChildren: 0.3,
                                    staggerChildren: 0.05
                                }
                            },
                            closed: {
                                clipPath: "inset(10% 50% 90% 50% round 10px)",
                                transition: {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.3
                                }
                            }
                        }}
                        style={{ pointerEvents: open ? "auto" : "none" }}
                        className='flex flex-col justify-center items-center my-10 space-y-12'
                    >
                        <motion.li variants={itemVariants}
                            onClick={() => setColor('bg-red-300')}
                            className='w-7 h-7 rounded-full bg-red-300 hover:scale-110'></motion.li>
                        <motion.li variants={itemVariants}
                            onClick={() => setColor('bg-blue-300')}
                            className='w-7 h-7 rounded-full bg-blue-300'></motion.li>
                        <motion.li variants={itemVariants}
                            onClick={() => setColor('bg-yellow-300')}
                            className='w-7 h-7 rounded-full bg-yellow-300'></motion.li>
                        <motion.li variants={itemVariants}
                            onClick={() => setColor('bg-orange-300')}
                            className='w-7 h-7 rounded-full bg-orange-300'></motion.li>
                        <motion.li variants={itemVariants}
                            onClick={() => setColor('bg-purple-300')}
                            className='w-7 h-7 rounded-full bg-purple-300'></motion.li>

                    </motion.ul>
                </motion.nav>
            </div>
        </div >
    )
}

export default Left