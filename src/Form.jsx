import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Form = ({ addItem }) => {
  const [itemName, setItemName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemName) {
      toast.error('please provide value')
      return
    }
    addItem(itemName)
    setItemName('')
    //console.log(itemName)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>grocery bud</h4>
      <div className="form-control">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="btn">
          Add Item
        </button>
      </div>
    </form>
  )
}
export default Form
