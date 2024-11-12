import React, { useState } from 'react'
import { InlineIcon } from '@iconify/react'
import HeaderModal from './HeaderModal'

export default function WishlistHeader(props) {
    const { listInfo, setListInfo, headerPhoto, setHeaderPhoto } = props
    const [modalType, setModalType] = useState(null)

    const [listName, setListName] = useState('')
    const [date, setDate] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    const openModal = (type) => setModalType(type)
    const closeModal = () => {
        setModalType(null)
        setListName('')
        setDate('')
        setLocation('')
        setDescription('')
    }

    return (
        <div className="header-container">
            <div className="header-photo">
                <div className="header-photo-overlay"
                    onClick={() => openModal('photo')}>
                    <span style={{fontSize: "40px"}}><InlineIcon icon="tabler:edit"/></span>
                </div>
                <button className="header-photo-image">
                        {headerPhoto ? (
                            <img src={headerPhoto} alt="Header" 
                                style={{ width: '300px', 
                                height: '200px', 
                                borderRadius: '10px',
                                objectFit: "cover" }} />
                        ) : (
                            <span 
                                style={{ fontSize: "50px" }}>
                                <InlineIcon icon="tabler:camera-up" />
                            </span>
                        )}
                </button>
            </div>

            <div className="header-info">
                <p className="header-name"
                    onClick={() => openModal('listName')}>
                    <span style={{fontSize: "20px", marginRight: "10px"}}><InlineIcon icon="tabler:edit"/></span>
                    <span>{listInfo.listName}</span>
                </p>
                <p className="header-date"
                    onClick={() => openModal('date')}>
                    <span style={{fontSize: "20px", marginRight: "10px"}}><InlineIcon icon="tabler:calendar-month"/></span>
                    <span>{listInfo.date}</span>
                </p>
                <p className="header-location"
                    onClick={() => openModal('location')}>
                    <span style={{fontSize: "20px", marginRight: "10px"}}><InlineIcon icon="tabler:address-book"/></span>
                    <span>{listInfo.location}</span>
                </p>
                <p className="header-description"
                    onClick={() => openModal('description')}>
                    <span style={{fontSize: "20px", marginRight: "10px"}}><InlineIcon icon="tabler:edit"/></span>
                    <span>{listInfo.description}</span>
                </p>
                    { modalType && <HeaderModal 
                        onClose={closeModal}
                        modalType={modalType}
                        listInfo={listInfo}
                        listName={listName}
                        date={date}
                        location={location}
                        description={description}
                        setListInfo={setListInfo}
                        setListName={setListName}
                        setDate={setDate}
                        setLocation={setLocation}
                        setDescription={setDescription}
                        headerPhoto={headerPhoto}
                        setHeaderPhoto={setHeaderPhoto}
                    />}
            </div>
        </div>
    )
}
