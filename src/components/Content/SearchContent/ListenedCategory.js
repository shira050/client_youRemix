import React from "react";
import CardSection from "../CardSection";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../../icons/Icons";
import { setCurrent } from "../../../store/Player";

function ListenedCategory({ category }) {
  console.log(category);
  const { current, playing, controls } = useSelector((state) => state.player);

  const isCurrentPlaying = current?._id === category._id && playing;
  const dispatch = useDispatch();

  const updateCurrent = () => {
    if (current._id === category._id) {
      if (playing) {
        controls.pause();
      } else {
        controls.play();
      }
    } else {
      dispatch(setCurrent(category));
    }
  };
  return (
    <div
      style={{ "--color": category.backgroundColor || "#85144b" }}
      className={
        "bg-[color:var(--color)] rounded-lg relative w-[24.25rem] h-[13.75rem] shrink-0"
      }
    >
      <div className="absolute inset-0 overflow-hidden">
        <h3 className="text-white text-[2.5rem] tracking-tighter leading-7 font-bold p-4 break-words">
          {category.title}
        </h3>

        <img
          src={
            category.image ||
            "https://cdn.pixabay.com/photo/2015/01/08/01/11/headphones-592196_1280.jpg"
          }
          className="w-32 h-32 rotate-[25deg] translate-x-[18%] translate-y-[5%] absolute bottom-0 right-0 shadow-normal"
          alt=""
        />
         <button
        onClick={updateCurrent}
        className={`w-10 h-10 rounded-full bg-primary absolute bottom-2 right-2 items-center justify-center group-hover:flex group-focus:flex ${
          isCurrentPlaying ? "flex" : "hidden"
        }`}
      >
        <Icon name={isCurrentPlaying ? "pause" : "play"} size={16} />
      </button>
      </div>
     
      {/* <h3> {category.title}</h3>
      <div className="w-50">
        <CardSection item={category} key={category._id} />
      </div> */}
    </div>
  );
}

export default ListenedCategory;
