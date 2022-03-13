import React,{useContext, useState} from 'react'
import Spinner from '../Components/Spinner';
import MessageContext from '../context/MessageContext';
import Master from './../Pages/Layout/Master';
import ax from '../ax';
import { useParams } from 'react-router-dom';

const SearchUser = () => {
    const [email,setEmail] = useState('');
    const [loader,setLoader] = useState(false);
    const [foundUser,setFoundUser] = useState(false);

    //context
    const {setMessage} = useContext(MessageContext);
    const {slug} = useParams();
    
    const findUser=()=>{
        setLoader(true);
        const token = localStorage.getItem("token");
        ax.post("/search/user",{email},{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            if(data.success){   
                setFoundUser(data.data)
                setMessage({type:"success",message:"search user found"});
                setLoader(false);

            }else{
                setLoader(false);
                setMessage({type:"error",message:"Email not found"});
                setFoundUser(false);

            }
        })
    }


    const contribute=()=>{
        setLoader(true);
        const token = localStorage.getItem("token");
        ax.post("/contribute-note/create",{note_slug:slug,user_email:foundUser.email},{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setLoader(false);
            if(data.data === 'already_contribute'){
            setMessage({type:'error',message:"Already Contributed that note !"});
            setFoundUser('');
            }

           if(data.success){
            setMessage({type:'success',message:"Contributed!"});
            setFoundUser('');
           }
        })
    }

  return (
    <Master>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>

                    {
                        loader ? <Spinner/> :

                        <div className='card '>
                        <div className='card-header bg-white '>
                            Contribute Form
                        </div>

                       <div className='card-body'>
                       <div className='form-group pt-1'>
                            <label htmlFor=''>Enter Email</label>
                            <input type='email' className='form-control my-2'
                            onChange={(e)=>setEmail(e.target.value)}/>
                                <button
                                onClick={()=>findUser()}
                                className='btn btn-sm btn-danger'>Search</button>
                        </div>
                       </div>
                               {
                                   foundUser &&
                                   <div>
                                   <hr/>
                                   <div className='card bg-danger p-3'>
                                       <h2 className='text-center'>{foundUser.name}</h2>
                                       <button 
                                       onClick={contribute}
                                       className='btn btn-sm btn-primary p-1'>Contribute</button>
                                   </div>
                                   </div>
                               }

                    </div>

                    }


                </div>
            </div>
        </div>
    </Master>
  )
}

export default SearchUser