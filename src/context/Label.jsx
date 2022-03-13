import React,{useContext,useEffect} from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom';
import Spinner from '../Components/Spinner'
import LabelContext from './LabelContext'
import ax from '../ax';


const Label = () => {
const {loader,label,selectedLable,setLabel,setLoader,
  setSelectedLabel} = useContext(LabelContext);

  const {pathname} = useLocation();
  const {push} = useHistory();

  const renderAll=()=>{
    setSelectedLabel(null);
    push("/");

  }



  const token = localStorage.getItem("token");

  useEffect(()=>{
      ax.get("/category",{headers : {Authorization:"Bearer " + token}}).then(
          (d)=>{
          const {data} = d.data;
          setLabel(data);
          setLoader(false);
      }) 

  },[])

  return (
    <div className="card bg-gray-100">
          <div className="card-body">

            {loader && <Spinner/>}
            
            {!loader &&
        <React.Fragment>
            <li className="list-group-item bg-bg text-white">
              Label
              <Link to={'/label'} className='btn btn-sm btn-dark float-right'>
                show all
                </Link>
            </li>

            
            <li className={`list-group-item text-white ${pathname === '/' ? 'bg-danger' : 'bg-dark'}`}>
                <span className="fas fa-tags text-white text-small" 
                onClick={()=>renderAll()}/>
                &nbsp; &nbsp;
                All Note
                
              </li>
            



            {label.map((d)=>{ 
              return(
                <Link
                key={d.id}
                to={`/${d.slug}/note`}
                >
              <li className={`list-group-item  text-white ${d.id === selectedLable ? 'bg-danger' : 'bg-dark'}`} key={d.id}
                onClick={()=>setSelectedLabel(d.id)}>
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                {d.name}
                <span className="badge badge-primary float-right">{d.note_count}</span>
              </li>
                </Link>

              )
            })}

            {/* <ul className="list-group label">
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Laravel Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <span className="fas fa-tags text-white text-small" />
                &nbsp; &nbsp;
                Vue JS Note
                <span className="badge badge-primary float-right">3</span>
              </li>
              <li className="list-group-item bg-dark text-white">
                <a href className="float-right">View All</a>
              </li>
            </ul>  */}
        </React.Fragment>
            }
          </div>
    </div>
  )
}

export default Label