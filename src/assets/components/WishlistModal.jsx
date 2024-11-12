import React from 'react'
import WishlistForm from './WishlistForm'

export default function WishlistModal(props) {
    const { onClose, addItem, giftBoxImage, item, price, link, note, image, setItem, setLink, setPrice, setNote, setImage } = props

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <WishlistForm 
                        onClose={onClose} 
                        addItem={addItem} 
                        item={item}
                        link={link}
                        price={price}
                        note={note}
                        image={image}
                        giftBoxImage={giftBoxImage}
                        setItem={setItem}
                        setLink={setLink}
                        setPrice={setPrice}
                        setNote={setNote}
                        setImage={setImage}/>
                </div>
            </div>
        </>
    )
}
