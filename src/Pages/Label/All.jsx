import React, { useContext, useEffect ,useState} from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../../Components/Spinner';
import Master from './../Layout/Master';
import ax from '../../ax';
import MessageContext from '../../context/MessageContext';

const All = () => {
    const [label,setLabel] = useState([]);
    const [nextPage,setNextPage] = useState('');
    const [pageLoader,setPageLoader] = useState(true);
    const [loadMoreLoader,setLoadMoreLoader] = useState(false);
    //context
    const {setMessage} = useContext(MessageContext);

    useEffect(()=>{
        setPageLoader(true);
        const token = localStorage.getItem("token");
        ax.get("/category",{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setLabel(data.data);
            setNextPage(data.data.next_page_url);
            setPageLoader(false);
        })
    },[])

    const renderNextPage=()=>{
        setPageLoader(true);
        const token = localStorage.getItem("token");
        ax.get(nextPage,{headers:{Authorization:`Bearer ${token}`}})
        .then(({data})=>{
            setLabel([...label,...data.data]);
            setNextPage(data.data.next_page_url);
            setPageLoader(false);
        })
    }


    const deleteLabel=(slug)=>{
        setPageLoader(true);
        let frmData = new FormData();
        frmData.append("_method","DELETE");
        const token = localStorage.getItem("token");

        ax.post("/category/"+slug,frmData,{headers:{Authorization:`Bearer ${token}`}}) 
        .then(({data})=>{
            if(data.success){
                setPageLoader(false);
                setLabel(label.filter((d)=>d.slug !== slug));
                setMessage({type:"success",message:"label delete success"});
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
                    <Link  to='/label/create' className='btn btn-sm btn-danger'>
                        Create
                    </Link>
                    </div>


                    {
                        pageLoader ? <Spinner/> :

                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th className='text-white'>Name</th>
                                <th className='text-white'>Option</th>
                            </tr>
                        </thead>

                        <tbody>
                           {
                               label.map((d)=>{
                                    return(
                            <tr key={d.id}>
                                <td className='text-white'>{d.name}</td>
    
                                <td>
                                    <Link to={{pathname:`/label/edit/${d.slug}`,
                                                state:{label:d}
                                }} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                                    <button 
                                    onClick={()=>deleteLabel(d.slug)}
                                    className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                                    )
                               })
                           }
                        </tbody>
                    </table>
                    }


                </div>

                  {/* For Load */}
            <div className="row">
              <div className="col-md-12 text-center">
                <button className="btn btn-primary btn-fab btn-icon btn-round"
                onClick={()=>renderNextPage()}
                disabled={nextPage === null || 'undenfined' ? true : false}>
                  {
                    loadMoreLoader ? <Spinner/> :
                    <i className="fas fa-arrow-down" />
                  }
                  
                </button>
              </div>
            </div>

                </div>
            </div>
       </div>
   </Master>
  )
}

export default All