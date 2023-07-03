import React from 'react'
import RowSection from './rowSection';
import HeaderTitle from '../Content/HeaderTitle';

function ComponentList({ title, items,rate }) {
    return (
        <section className='mb-4 min-w-full'>
            <HeaderTitle title={title} font={'semibold'}/>
            <div className='grid gap-x-6'>
                {items.map(item => <RowSection item={item} key={item._id} />)}
            </div>
        </section>
    )
}

export default ComponentList