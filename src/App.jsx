import { useState } from 'react'
import Form from './Form'
import { nanoid } from 'nanoid'
import ItemList from './ItemList'
import { ToastContainer, toast } from 'react-toastify'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    list = JSON.parse(localStorage.getItem(list))
  } else {
    list = []
  }
  return list
}

const setLocalStorage = (items) => {
  localStorage.setItem('list', JSON.stringify(items))
}
const defaultList = JSON.parse(localStorage.getItem('list') || '[]')

const App = () => {
  const [items, setItems] = useState(defaultList)

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    }
    const newItems = [...items, newItem]
    setItems(newItems)
    setLocalStorage(newItems)
    toast.success('item added to the list')
    console.log(newItems)
  }

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId)
    setItems(newItems)
    setLocalStorage(newItems)
    toast.success('item deleted')
  }

  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed }
        return newItem
      }
      return item
    })
    setItems(newItems)
    setLocalStorage(newItems)
  }

  const clearItems = () => {
    localStorage.clear()
    setItems([])
  }

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <ItemList items={items} removeItem={removeItem} editItem={editItem} />
      <h4
        style={{
          marginTop: '30px',
          textAlign: 'center',
          cursor: 'pointer',
          color: 'var(--primary-500)',
        }}
        onClick={() => clearItems()}
      >
        {items.length > 0 ? 'clear items' : ''}
      </h4>
    </section>
  )
}
export default App
