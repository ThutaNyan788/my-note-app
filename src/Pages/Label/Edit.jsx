import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Master from './../Layout/Master';
import ax from '../../ax';
import MessageContext from './../../context/MessageContext';

const Edit= () => {
    const location = useLocation();
    const [label,setLabel] = useState(location.state.label.name);
    const [updateLoader,setUpdateLoader] = useState(false);

    //context
    const {setMessage} = useContext(MessageContext);

    const update=()=>{
        setUpdateLoader(true);
        const token = localStorage.getItem("token");
        const frmData = new FormData();
        frmData.append("name",label);
        frmData.append("_method","PUT");

        ax.post("/category/"+location.state.label.slug,frmData,{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setUpdateLoader(false);
            if(data.success){
                setMessage({type:'success',message:"label update success"});
                setLabel("");
            }
        })
    }

  return (
   <Master>
       <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>

                <div className='card p-2 mt-2'>
                    <div>
                    <Link to='/label' className='btn btn-sm btn-danger mb-4'>
                        View All Label
                    </Link>
                    </div>

                    <div className='form-group'>
                        <label htmlFor=''>Enter Label</label>
                        <input type='text' className='form-control'
                        onChange={(e)=>setLabel(e.target.value)}
                        value={label}
                        />
                        <div className='mt-3'>
                            <button className='btn btn-sm btn-danger'
                            onClick={()=>update()}
                            disabled={updateLoader}>
                                {updateLoader ? <Spinner/> : 'update'}
                                </button>
                        </div>
                    </div>
                </div>

                </div>
            </div>
       </div>
   </Master>
  )
}

export default Edit;