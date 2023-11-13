import React from 'react'

interface props {
    progress: number
}

const Navbar = ({progress}: props) => {
    return (
        <>
            <div className='w-full px-6 pt-4'>
                <h1 className='font-bold '>Questions</h1>
            </div>
            <progress className='w-full' value={progress} max={8}></progress>
        </>
    )
}

export default Navbar
