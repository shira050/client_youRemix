import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from '../../icons/Icons'
import { setCurrent } from '../../store/Player'

function RowSection({ item}) {

    const dispatch = useDispatch();
    const {current, playing, controls} = useSelector((state) => state.player)

    const isCurrentPlaying = (current?._id === item._id && playing);

    const updateCurrent = () => {
        if(current._id === item._id){
            if(playing){
                controls.pause()
            }else{
                controls.play()
            }
        }else{
            dispatch(setCurrent(item))
        }
        
    }
    return (
        <Link
            key={item._id}
            className="bg-footer p-4 rounded-md flex-1 hover:bg-active group"
        >
            <div className='row'>
                <div className='w-20 h-10 mb-4 relative col-3 mx-2'>
                    <img src={item.image} alt="player-card" className={`absolute inset-0 object-cover  `} />
                </div>
                <div className='col-9 row'>
                    <h5 className='truncate text-base font-bold font-sans col-7'>
                        {item.title}
                    </h5>
                    <p className=' line-clamp-2 overflow-hidden text-ellipsis whitespace-normal text-link text-sm font-medium font-sans mt-1 col-5'>{item.subtitle}</p>
                </div>
                <button 
                    onClick={updateCurrent}
                    className={`w-10 h-10 rounded-full bg-primary  bottom-2 right-2 items-center justify-center group-hover:flex group-focus:flex ${isCurrentPlaying ? 'flex' : 'hidden' }`}>
                        <Icon name={ isCurrentPlaying ? "pause" : "play"} size={16} />
                </button>
            </div>
        </Link>

    )
}
export default RowSection