import React from 'react'
import ComponentShelf from '../components/Content/HomeContent/ComponentShelf'
import {items, items2, items3} from '../static/data/songs'

function Home() {

  return (
    <div className='grid gap-y-6 pt-6'>
      <ComponentShelf title={'Your daily music needs'} seeAll ="/vfmkvgkbn" items={items}/>
      <ComponentShelf title={'focus'} seeAll ="/vfmkvgkbn" items={items2}/>
      <ComponentShelf title={'Bring music to your home'} seeAll ="/vfmkvgkbn" items={items3}/>
    </div>
  )
}

export default Home