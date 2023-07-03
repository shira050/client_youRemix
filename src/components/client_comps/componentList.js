import React, { useEffect, useState } from "react";
import RowSection from "./rowSection";
import HeaderTitle from "../Content/HeaderTitle";
import { Icon } from "../../icons/Icons";

function ComponentList({ title, items, rate }) {
  const [shuffledItems, setShuffledItems] = useState([...items]);

  const shuffleItems = () => {
    const shuffled = [...shuffledItems];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledItems(shuffled);
  };

  useEffect(() => {
    setShuffledItems(items);
  }, [items]);

  return (
    <section className="mb-4 min-w-full">
      <HeaderTitle title={title} font={"semibold"} />
      <button onClick={shuffleItems} className="rounded btn btn-success my-3">
        <Icon name={"shuffle"}></Icon>
      </button>
      <div className="grid gap-x-6">
        {shuffledItems.map((item) => (
          <RowSection item={item} key={item._id} />
        ))}
      </div>
    </section>
  );
}

export default ComponentList;
