import React, { useEffect , useState} from 'react'
import Master from '../Pages/Layout/Master'
import { Link } from 'react-router-dom'
import ContributeButton from '../Components/ContributeButton'
import ax from '../ax'
import Spinner from '../Components/Spinner'

const AllContribute = () => {
const [loader,setLoader] = useState(true);
const [data,setData] = useState([])

    useEffect(()=>{
        //get contribute note
        const token = localStorage.getItem("token");
    ax.get('/contribute-note/get',{ headers: {Authorization:`Bearer ${token}`} }).then(
        ({data})=>{
          if(data.success){
            setLoader(false);
            setData(data.data.data);
          }
        }
      )
    },[]);


  return (
    <Master>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 offset-md-2'>
                    <div className='card p-2'>
                        <div>
                           
                            <ContributeButton/>

                            {
                                loader ? <Spinner/> :
                                <ul className='mt-2 list-group'> 
                                {
                                    data.map((d)=>{
                                        return(
                                        <li key={d.id} className='list-group-item bg-dark mt-1 text-white'>
                                            You Contribute <Link to={`/note/${d.note.slug}`}>{d.note.title}</Link> To {d.receive_user.name}
                                        </li>
                                        )
 
                                    })
                                }
                             </ul>
                            }


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Master>
  )
}

export default AllContribute