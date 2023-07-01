import React from 'react'
import { Link } from 'react-router-dom'

function Category({ category }) {
    const defaultCover="https://cdn.pixabay.com/photo/2017/08/06/12/54/headphones-2592263_1280.jpg";
    return (
        <Link to={`/songs/CategorySongs/${category._id}/${category.title}`}>
        <div
            style={{ '--color': category.backgroundColor }}
            className={"bg-[color:var(--color)] rounded-lg before:pt-[100%] before:block relative"}>
            <div className='absolute inset-0 overflow-hidden'>
                <h3 style={{zIndex:"999"}} className='text-white text-2xl tracking-tighter leading-7 font-bold p-4 break-words absolute'>
                    {category.title}

                </h3>
                <img src={category.cover||defaultCover} 
                className="w-[6.25rem] h-[6.25rem] rotate-[25deg] translate-x-[18%] translate-y-[5%] absolute bottom-0 right-0 shadow-normal" alt=''
                />
            </div>
        </div>
        </Link>
    )
}

export default Category