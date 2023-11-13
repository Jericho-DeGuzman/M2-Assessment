import React from 'react'

const Skeleton = () => {
    return (
        <>
            <div className='w-6/12'>
                <div className='w-6/12 h-8 animate-pulse bg-gray-200 my-2 rounded-md' />
                <div className='w-12/12 h-14 animate-pulse bg-gray-200 my-2 rounded-md' />
                <div className='my-6'>
                    <div className='h-8 w-12/12 animate-pulse bg-gray-200 my-2 rounded-md' />
                    <div className='h-8 w-12/12 animate-pulse bg-gray-200 my-2 rounded-md' />
                    <div className='h-8 w-12/12 animate-pulse bg-gray-200 my-2 rounded-md' />
                </div>
                <div className='flex justify-end my-4'>
                    <div className='w-14 h-8 animate-pulse bg-gray-200 rounded-md' />
                </div>
            </div>
        </>
    )
}

export default Skeleton
