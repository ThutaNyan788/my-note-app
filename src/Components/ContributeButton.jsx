import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

const ContributeButton = () => {
    const {pathname} = useLocation();


  return (
    <div>
         <Link to='/show/contribute' 
         className={`
         ${pathname === '/show/contribute' ? 
         'btn-primary' : 'btn-outline-primary'} 
         btn btn-sm mx-2`}>
                Contribute
        </Link>

        <Link to='/show/receive' 
        className={`
        ${pathname === '/show/receive' ? 
        'btn-primary' : 'btn-outline-primary'} 
        btn btn-sm `}>
            Receive
        </Link>
    </div>
  )
}

export default ContributeButton