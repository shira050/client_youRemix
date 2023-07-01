import React from 'react';
import { Icon } from '../icons/Icons';


const FeedbackStar = ({ rating }) => {
  const stars = [];
  let color="";

  for (let i = 1; i <= 5; i++) {
    (i <= rating)?color="goldStarIcon":color="grayStarIcon";
    stars.push(<Icon name={color} size={20} />);
  }

  return <div className="text-center">{stars}</div>;
};

export default FeedbackStar;
