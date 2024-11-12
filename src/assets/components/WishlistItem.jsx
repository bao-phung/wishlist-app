import React from 'react'
import { InlineIcon } from '@iconify/react'

export default function WishlistItem(props) {
    const { id, key, item, link, price, note, image, editItem, deleteItem} = props
    return (
        <>
        <div className="wishlist-card">
            <img src={image} style={{
                width: "100px", 
                height: "100px", 
                objectFit: "cover",
                borderRadius: "3px"
            }} alt="Wishlist Item" className="wishlist-image" />
            <li className="wishlist-items">
                <span id="item-name">{item}</span>
                <span id="item-price">
                    { price && (
                        <>
                            <InlineIcon icon="fluent-emoji-flat:heavy-dollar-sign"/>
                            {price}
                        </>
                    )}
                    </span>
                <span id="item-link">
                    { link && 
                        <>
                            <InlineIcon icon="fluent-emoji-flat:link"/>
                            <span> Link to Item: </span>
                            <a href={link} target="_blank" rel="noopener noreferrer">
                            {link} </a>
                        </>
                    }</span>
                <span id="item-note">{note && `Note: ${note}`}</span>
            </li>
            <div className="wishlist-buttons">
                <button className="item-edit-btn"
                        onClick={() => {
                            editItem(id)
                        }}>
                    <span style={{fontSize: "18px"}}><InlineIcon icon="tabler:edit"/></span>
                </button>
                <button className="item-delete-btn" 
                        onClick={() => deleteItem(id)}>
                    <span style={{fontSize: "18px"}}><InlineIcon icon="tabler:trash"/></span>
                </button>
            </div>
        </div>
        </>
    )
}
