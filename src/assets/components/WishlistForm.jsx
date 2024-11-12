import React, { useState } from 'react'

export default function WishlistForm(props) {
    const { onClose, addItem, giftBoxImage, item, link, price, note, image, setItem, setLink, setPrice, setNote, setImage } = props

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.trim()) {
            if(!link.trim()) { setLink('') }
            if(!price.trim()) { setPrice('')}
            if(!note.trim()) { setNote('')}
            addItem(item, link, price, note, image)
        }
        else {
            alert("Please enter fields for item!")
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            };
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault()
        setImage(giftBoxImage)
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Add an Item</p>
            <div className="inputField">
                <label htmlFor="item">Item:</label>
                <input 
                    className="formTextbox"
                    id="item"
                    value={item} 
                    maxlength="40"
                    onChange={e => setItem(e.target.value)} 
                    placeholder='Enter item here...'
                />
            </div>
            <div className="inputField">
                <label htmlFor="link">Link:</label>
                <input 
                    className="formTextbox"
                    id="link"
                    value={link} 
                    onChange={e => setLink(e.target.value)} 
                    placeholder='Enter link here...'
                />
            </div>
            <div className="inputField">
                <label htmlFor="price">Price:</label>
                <input
                    className="formTextbox"
                    id="price" 
                    value={price} 
                    maxLength="25"
                    onChange={e => setPrice(e.target.value)} 
                    placeholder='Enter price here...'
                />
            </div>
            <div className="uploadImgBox">
                {image && image !== giftBoxImage ? (
                    <>
                        <div className="image-preview">
                            <label>Image Preview:</label>
                            <img src={image} alt="Preview" 
                                style={{ width: '100px', 
                                height: '100px', 
                                objectFit: "cover" }} />
                        </div>
                        <button className="remove-image-btn" 
                        onClick={handleRemoveImage}>Remove Image</button>
                    </>
                ) : (
                    <div>
                        <label htmlFor="item-img">Image: </label>
                        <input 
                            id="item-img"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                )}
            </div>
            <div className="inputField">
                <label htmlFor="note">Note:</label>
                <input
                    className="formTextbox"
                    id="note" 
                    value={note} 
                    maxlength="60"
                    onChange={e => setNote(e.target.value)} 
                    placeholder='Enter note here...'
                />
            </div>
            <div className="formButtons">
                <button type="button" onClick={onClose}>Close</button>
                <button className="submitButton" type="submit">Save Item</button>
            </div>
        </form>
    )
}
