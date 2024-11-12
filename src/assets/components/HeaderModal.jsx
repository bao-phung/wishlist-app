import React, { useState } from 'react'

export default function HeaderModal(props) {
    const { onClose, listName, date, location, description, setListName, setDate, 
            setLocation, setDescription, listInfo, setListInfo, modalType,
            headerPhoto, setHeaderPhoto } = props

    const [temporaryPhoto, setTemporaryPhoto] = useState(null)
    const [photoRemove, setPhotoRemove] = useState(false)

    const handleSave = (e) => {
        e.preventDefault()
        if (listName.trim() && date.trim() && location.trim() && description.trim()){
            setListInfo({
                listName,
                date,
                location,
                description
            })
            onClose()
        } else {
            alert("Please fill out the fields!");
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setTemporaryPhoto(reader.result)
                setPhotoRemove(false)
            };
            reader.readAsDataURL(file)
        }
    }

    const handleRemoveImage = (e) => {
        e.preventDefault()
        setTemporaryPhoto(null)
        setPhotoRemove(true)
    }

    const handleSaveHeader = (e) => {
        e.preventDefault()
        if(photoRemove) {
            setHeaderPhoto(null)
            setTemporaryPhoto(null)
            onClose()
        }
        else if (temporaryPhoto) {
            setHeaderPhoto(temporaryPhoto)
            setTemporaryPhoto(null)
            onClose()
        } else {
            alert("Please upload an image!");
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <form onSubmit={handleSave}>
                    {modalType === 'listName' && (
                    <>
                        <p>Edit List Name</p>
                        <div className="inputField">
                            <label htmlFor="list-name">List Name:</label>
                            <input 
                                className="formTextbox"
                                id="list-name"
                                value={listName}
                                onChange={e => {
                                    setListName(e.target.value)
                                    setDate(listInfo.date)
                                    setLocation(listInfo.location)
                                    setDescription(listInfo.description)
                                }}
                                maxlength="40"
                                placeholder='Enter list name here...'
                            />
                            <div className="formButtons">
                                <button type="button" onClick={onClose}>Close</button>
                                <button className="submitButton" type="submit">Save List Name</button>
                            </div>
                        </div>
                    </>
                    )}
                    {modalType === 'date' && (
                    <>
                        <p>Edit Date</p>
                        <div className="inputField">
                            <label htmlFor="list-date">Date:</label>
                            <input
                                type="date"                                
                                id="list-date"
                                className="formTextbox"
                                value={date}
                                onChange={e => {
                                    setListName(listInfo.listName)
                                    setDate(e.target.value)
                                    setLocation(listInfo.location)
                                    setDescription(listInfo.description)
                                }}
                            />
                            <div className="formButtons">
                                <button type="button" onClick={onClose}>Close</button>
                                <button className="submitButton" type="submit">Save Date</button>
                            </div>
                        </div>
                    </>
                    )}
                    {modalType === 'location' && (
                    <>
                        <p>Edit Location</p>
                        <div className="inputField">
                            <label htmlFor="list-location">Location/Address:</label>
                            <input 
                                className="formTextbox"
                                id="list-location"
                                value={location}
                                onChange={e => {
                                    setListName(listInfo.listName)
                                    setDate(listInfo.date)
                                    setLocation(e.target.value)
                                    setDescription(listInfo.description)
                                }}
                                maxlength="200"
                                placeholder='Enter location here...'
                            />
                            <div className="formButtons">
                                <button type="button" onClick={onClose}>Close</button>
                                <button className="submitButton" type="submit">Save Location</button>
                            </div>
                        </div>
                    </>
                    )}
                    {modalType === 'description' && (
                    <>
                        <p>Edit Description</p>
                        <div className="inputField">
                            <label htmlFor="list-description">Location/Address:</label>
                            <textarea 
                                className="description-box"
                                id="list-description"
                                value={description}
                                onChange={e => {
                                    setListName(listInfo.listName)
                                    setDate(listInfo.date)
                                    setLocation(listInfo.location)
                                    setDescription(e.target.value)
                                }}
                                maxlength="500"
                                placeholder='Enter description here...'
                            />
                            <div className="formButtons">
                                <button type="button" onClick={onClose}>Close</button>
                                <button className="submitButton" type="submit">Save Description</button>
                            </div>
                        </div>
                    </>
                    )}
                    {modalType === 'photo' && (
                    <>
                        <p>Upload a Photo!</p>
                        <div className="inputField">
                            <button className="remove-image-btn" 
                            onClick={handleRemoveImage}>Remove Image</button>
                            <label htmlFor="item-img">Image: </label>
                            <input 
                                id="item-img"
                                type="file"
                                onChange={handleImageChange}
                            />
                            {temporaryPhoto && !photoRemove && (
                                <div className="image-preview">
                                    <label>Image Preview:</label>
                                    <img src={temporaryPhoto} alt="Preview" 
                                        style={{ width: '100px', 
                                        height: '100px', 
                                        objectFit: "cover" }} />
                                </div>
                            )}
                            {headerPhoto && !photoRemove && (
                                <div className="image-preview">
                                    <label>Current Header Photo:</label>
                                    <img src={headerPhoto} alt="Current Header" 
                                        style={{ width: '100px', 
                                        height: '100px', 
                                        objectFit: "cover" }} />
                                </div>
                            )}
                        </div>
                        <div className="formButtons">
                            <button type="button" onClick={(e) => {
                                e.preventDefault()
                                setPhotoRemove(false)
                                setTemporaryPhoto(null)
                                onClose()
                            }}>Close</button>
                            <button className="submitButton" onClick={handleSaveHeader}>Save Header</button>
                        </div>
                    </>
                    )}
                </form>
            </div>
        </div>
    )
}
