import React,{useState,useContext} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Master from '../Layout/Master'
import LabelContext from '../../context/LabelContext';
import ax from '../../ax';
import Spinner from './../../Components/Spinner';
import MessageContext from './../../context/MessageContext';

const Create = () => {
    const [description,setDescription] = useState()
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState("");
    const [color,setColor] = useState("");
    const [error,setError] = useState({});
    const [loader,setLoader] = useState(false);
    //context 
    const {label} = useContext(LabelContext);
    const {setMessage} = useContext(MessageContext)

    const storeNote=()=>{
        setLoader(true);
        const frmData = new FormData();
        frmData.append('title',title);
        frmData.append("description",description);
        frmData.append("category_slug",category);
        frmData.append("color",color);

        const token = localStorage.getItem('token');
        ax.post("/note",frmData,{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setLoader(false);
            if(data.success === false){
                setError(data.data);
                setMessage({type:'error',message:'Please enter all field!'});
                return;
            }

            if(data.success === true){
                setMessage({type:'success',message:'Note Created Success'});
                return;
            }
        })
    }
  return (
    <Master>
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header ' style={{backgroundColor:color ? color : '#fff'}}>
                        Create Note New 
                    </div>
                    <div className='card-body'>
                        <div className='form-group'>
                            <label htmlFor=''>Enter Title</label>
                            <input type='text' className={`form-control ${error.title ? 'border border-danger' : ""}`}
                            onChange={(e)=>setTitle(e.target.value)}/>
                            {
                                error.title && error.title.map((err)=>{
                                    return(
                                        <small className='text-danger'>{err}</small>
                                    )
                                })
                            }
                        </div>

                        <div className='form-group my-3'>
                            <label htmlFor=''>Choose Label</label>
                            <select className={`form-control ${error.category_slug ? 'border border-danger' : ""}`}
                            onChange={(e)=>setCategory(e.target.value)}>
                                <option value='' selected disabled>--Select Label--</option>
                                {
                                    label.map((d)=>{
                                        return(
                                            <option key={d.id} value={d.slug}>
                                                {d.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            {
                                error.category_slug && error.category_slug.map((err)=>{
                                    return(
                                        <small className='text-danger'>{err}</small>
                                    )
                                })
                            }
                        </div>

                        <div className='form-group'>
                            <label htmlFor=''>Choose Color</label>
                            <select className={`form-control ${error.color ? 'border border-danger' : ""}`}
                            onChange={(e)=>setColor(e.target.value)}>
                                <option value="" selected disabled>--Select Color--</option>
                                <option value="#dc3545">Red</option>
                                <option value="#20c997">Green</option>
                                <option value="#007bff">Blue</option>
                                <option value="#ffc107">Yellow</option>
                                <option value="#fd7e14">Orange</option>
                            </select>

                            {
                                error.color && error.color.map((err)=>{
                                    return(
                                        <small className='text-danger'>{err}</small>
                                    )
                                })
                            }
                        </div>

                        <div className='form-group'>
                            <label htmlFor=''>Enter Description</label>
                            <ReactQuill className={`bg-white ${error.description ? "border border-danger" : " "}`} theme="snow" value={description} onChange={setDescription}/>
                            {
                                error.description && error.description.map((err)=>{
                                    return(
                                        <small className='text-danger'>{err}</small>
                                    )
                                })
                            }
                        </div>

                        <button className='btn  btn-danger mt-3'
                        onClick={()=>storeNote()}
                        disabled={loader}>
                            {
                                loader && <Spinner/>
                            }
                        Create
                        </button>
                    </div>
                </div>
            </div>    
        </div>
    </Master>
  )
}

export default Create