import React from 'react'
import { useLocation } from 'react-router-dom'
import { CardsSection } from '../../../components/cardsSection/CardsSection';

export const AllBoards = () => {
    const location=useLocation()
    
  return (
    <div className='boards-parent'>
        <div className="">

<CardsSection getBoardId={location.state} />
</div>



    </div>
  )
}
