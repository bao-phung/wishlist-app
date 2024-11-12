import { useState, useEffect } from "react"
import WishlistHeader from "./assets/components/WishlistHeader"
import WishlistList from "./assets/components/WishlistList"
import WishlistModal from "./assets/components/WishlistModal"
import giftBoxImage from "./assets/img/giftbox.png"
import giftmeIcon from "./assets/img/giftme-icon.webp"
import { InlineIcon } from '@iconify/react'

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [headerPhoto, setHeaderPhoto] = useState(null)
  const [item, setItem] = useState('')
  const [link, setLink] = useState('')
  const [price, setPrice] = useState('')
  const [note, setNote] = useState('')
  const [image, setImage] = useState(giftBoxImage)
  const [selectedId, setSelectedId] = useState(null)
  const [listInfo, setListInfo] = useState({
    listName: "List Name",
    date: "Date",
    location: "Location",
    description: "Description"
  })

  const persistData = (newWishlist) => {
    localStorage.setItem('wishlist', JSON.stringify({ wishlist: newWishlist }))
  }

  const persistHeader = (newHeader, newHeaderPhoto) => {
    localStorage.setItem('listInfo', JSON.stringify(newHeader))
    localStorage.setItem('headerPhoto', newHeaderPhoto || '')
  }

  const handleAddItem = (item, link, price, note, image) => {
    if(selectedId){
      const updatedList = wishlist.map(wish => wish.id === selectedId ? { ...wish, item, link, price, note, image} : wish)
      persistData(updatedList)
      setWishlist(updatedList)
    }
    else {
      const newItem = {
        id: crypto.randomUUID(),
        item,
        link,
        price,
        note,
        image
      }
      persistData([newItem, ...wishlist])
      setWishlist([newItem, ...wishlist])
    }
    closeModal()
  }

  const deleteItem = (id) => {
    const updatedList = wishlist.filter(wish => wish.id !== id)
    persistData(updatedList)
    setWishlist(updatedList)
  }

  const editItem = (id) => {
    const selectedItem = wishlist.find(wish => wish.id === id)
    setItem(selectedItem.item)
    setLink(selectedItem.link)
    setPrice(selectedItem.price)
    setNote(selectedItem.note)
    setImage(selectedItem.image)
    setSelectedId(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setLink('')
    setPrice('')
    setItem('')
    setNote('')
    setImage(giftBoxImage)
    setSelectedId(null)
  }

  useEffect(() => {
    if (!localStorage) { return }

    let localWishlist = localStorage.getItem('wishlist')
    if(!localWishlist) { return }
    localWishlist = JSON.parse(localWishlist).wishlist
    if(localWishlist) { setWishlist(localWishlist) }

    let savedListInfo = JSON.parse(localStorage.getItem('listInfo'))
    if(savedListInfo) { setListInfo(savedListInfo) }

    let savedHeaderPhoto = localStorage.getItem('headerPhoto')
    if(!savedHeaderPhoto) { return }
    if (savedHeaderPhoto) {setHeaderPhoto(savedHeaderPhoto)}
  }, []);

  
  return (
    <>
      <div className="giftme-title">
        <img src={giftmeIcon} alt="giftme Icon" className="giftme-icon"/>
        <h1>giftme</h1>
      </div>
      <div className="wishlist-header">
        <WishlistHeader
          listInfo={listInfo}
          setListInfo={(info) => {
            setListInfo(info)
            persistHeader(info, headerPhoto)
          }}
          headerPhoto={headerPhoto}
          setHeaderPhoto={(photo) => {
            setHeaderPhoto(photo)
            persistHeader(listInfo, photo)
          }}
        />
      </div>
      <div className="wishlist-list">
        <div className="list-actions-container">
          <button className="add-item-button" onClick={() => {setModalOpen(true)}}>
            <span style={{fontSize: "20px"}}><InlineIcon icon="tabler:circle-plus"/></span>
            Add Item
          </button>
        </div>
        <WishlistList
          wishlist={wishlist} 
          deleteItem={deleteItem}
          editItem={editItem}
          setModalOpen={setModalOpen} />
      </div>
      {modalOpen && <WishlistModal 
                      onClose={closeModal} 
                      addItem={handleAddItem} 
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
                      setImage={setImage} />}
    </>
  )
}

export default App
