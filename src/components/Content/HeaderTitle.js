import React from 'react'
import { Link } from 'react-router-dom'

function HeaderTitle({ title, font }) {
    return (
        <>
            <div className='flex items-center justify-between mb-4'>
                    <h3 className={`text-2xl font-${font} text-white tracking-tight font-sans`}>{title}</h3>
            </div>
        </>
    )
}

export default HeaderTitle