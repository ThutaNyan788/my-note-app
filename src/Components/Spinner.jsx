import React from 'react'

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-item-center p-1'>
        <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true" />
        <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export default Spinner