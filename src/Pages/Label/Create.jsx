import React,{useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import Master from './../Layout/Master';
import Spinner from '../../Components/Spinner';
import MessageContext from '../../context/MessageContext';
import ax from '../../ax';

const Create = () => {
    const [label,setLabel] = useState('');
    const [loader,setLoader] = useState(false);
    //context
    const {setMessage} = useContext(MessageContext);

    const storeLabel = () =>{
        setLoader(true);
        const token = localStorage.getItem("token");
        const data = new FormData();
        data.append("name",label);

        ax.post("/category",data,{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setLoader(false);
            if(data.success){
                setMessage({type:"success",message:"Create Label Success"});
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
                        value={label}/>
                        <div className='mt-3'>
                            <button onClick={storeLabel} className='btn btn-sm btn-danger'
                            disabled={loader}>
                                {
                                    loader ? <Spinner/> :
                                    "Create"
                                }
                                
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

export default Create