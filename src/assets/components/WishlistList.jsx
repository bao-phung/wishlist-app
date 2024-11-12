import React from 'react'
import WishlistItem from './WishlistItem'
import { InlineIcon } from '@iconify/react'

export default function WishlistList(props) {
    const { wishlist, editItem, deleteItem, setModalOpen } = props
    return (
        <>
            {wishlist.length === 0 && 'Add more items!'}
            <ul className='list-items-container'>
                {wishlist.map(wish => {
                    return (
                        <WishlistItem
                            id={wish.id}
                            key={wish.id}
                            item={wish.item}
                            link={wish.link}
                            price={wish.price}
                            note={wish.note}
                            image={wish.image}
                            editItem={editItem}
                            deleteItem={deleteItem}
                        >
                            <p>{wish}</p>
                        </WishlistItem>
                    )
                })}
                {wishlist.length !== 0 &&
                    <button 
                        className="end-of-list-add"
                        onClick={() => setModalOpen(true)}>
                        <span style={{fontSize: "20px"}}><InlineIcon icon="tabler:layout-grid-add"/></span>
                    </button>
                }
            </ul>
        </>
    )
}
