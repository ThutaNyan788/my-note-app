import React, { useContext, useEffect,useState } from 'react'
import MessageContext from '../context/MessageContext';
import Master from './Layout/Master';
import { useHistory,useParams ,Link} from 'react-router-dom';
import Label from '../context/Label';
import ax from './../ax';
import Spinner from './../Components/Spinner';

const Home = () => {
  //note
  const [note,setNote] = useState([]);
  const [nextPage,setNextPage] = useState('');
  const [pageLoader,setPageLoader] = useState(true);
  const [loadMoreLoader,setLoadMoreLoader] = useState(false);
  const [deleteLoader,setDeleteLoader] =useState(false);

  const [contributeLoader,setContributeLoader] = useState(true);
  const [contributeNote,setContributeNote] = useState([]);

  const [recieveLoader,setRecieveLoader] = useState(true);
  const [recieveNote,setRecieveNote] = useState([]);


  const message = useContext(MessageContext);
  const history = useHistory();
  const {category_slug} = useParams();
  

  useEffect(()=>{
    setPageLoader(true);
    if(!localStorage.getItem('token')){
      message.setMessage({type:'error',message:"Please Login First"})
      history.push("/login");
    }

    const token = localStorage.getItem("token");
    let url = '/note';
    if(category_slug){
      url +='?category_slug='+category_slug;
    }
    //get all note
    ax.get(url,{ headers: {Authorization:`Bearer ${token}`} }).then(
      ({data})=>{
        setNote(data.data.data);
        setNextPage(data.data.next_page_url);
        setPageLoader(false);
      }
    )

    //get contribute note
    ax.get('/contribute-note/get',{ headers: {Authorization:`Bearer ${token}`} }).then(
      ({data})=>{
        if(data.success){
          setContributeLoader(false);
          setContributeNote(data.data.data);
        }
      }
    )


    //get recieve note
    ax.get('/receive-note/get',{ headers: {Authorization:`Bearer ${token}`} }).then(
      ({data})=>{
        if(data.success){
          setRecieveLoader(false);
          setRecieveNote(data.data.data);
        }
      }
    )
    

  },[category_slug])

  const renderNextPage=()=>{
    setLoadMoreLoader(true);
    const token = localStorage.getItem("token");
    ax.get(nextPage,{ headers: {Authorization:`Bearer ${token}`} }).then(
      ({data})=>{
        setLoadMoreLoader(false);
        setNote([...note,...data.data.data]);
        setNextPage(data.data.next_page_url);
      }
    )
  }


  const deleteNote=(slug)=>{
    setDeleteLoader(slug);
    const frmData = new FormData();
    frmData.append("_method","DELETE");

    const token = localStorage.getItem("token");
    ax.post('/note/'+slug,frmData,{headers:{Authorization:`Bearer ${token}`}})
    .then(({data})=>{
      setDeleteLoader(false);
      if(data.success){
        setNote(note.filter((d)=>d.slug !== slug));
        message.setMessage({type:'success',message:'note delete success'});
      }
    })
  }



  return (
    <Master>
        <div className="container mt-3">
    <div className="row">
      {/* For Category and Information */}
      <div className="col-md-4">
       

        <Label/>

        {/* contribute note */}
        <div className="card bg-gray-100">
          <div className="card-body">
            <li className="list-group-item bg-bg text-white">
              Contribute Notes
              <Link to='/show/contribute' href className="badge badge-dark  text-white float-right">
                All
              </Link>
            </li>

            {
              contributeLoader ? <Spinner/> :

              <ul className="list-group label">
                {
                  contributeNote && contributeNote.map((d)=>{
                   
                    return(
                    <li  key={d.id} className="list-group-item bg-dark text-white">
                  
                     &nbsp; &nbsp;
                    <span>You Share <Link to={`/not/${d.note.slug}`}> {d.note.title} </Link> to 
                    &nbsp;{d.receive_user.name}</span>
                  </li>
                    )
                  })
                }

              </ul>
            }

          </div>
        </div>
        
        {/* recieve note */}
        <div className="card bg-gray-100">
          <div className="card-body">
            <li className="list-group-item bg-bg text-white">
              Recieve Notes
              <Link to='/show/receive' href className="badge badge-dark  text-white float-right">
                All
              </Link>
            </li>
            {
              recieveLoader ? <Spinner/> :

              <ul className="list-group label">

                {
                  recieveNote && recieveNote.map((d)=>{
                   
                    return(
                      <li key={d.id} className="list-group-item bg-dark text-white">
                
                      &nbsp; &nbsp;
                      You Got <Link to={`/not/${d.note.slug}`}>{d.note.title}</Link> From 
                      &nbsp;{d.contribute_user.name}
                    </li>
                    )
                  })
                }
            
            </ul>
            }


          </div>
        </div>

      </div>
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">

            <Link to="/note/create" className='btn btn-sm btn-danger mb-3'>Create New</Link>

            {
              pageLoader && <Spinner/>
            }

            {
              !pageLoader &&
            <div className="row">
            {/* Row Start*/}
              {note.map((d)=>{
                return(
                  <div className="col-md-4" key={d.id}>
                
                  <div className="card">
                  <Link to={`/note/${d.slug}`}>
                      <div className={`card-header  text-center`} style={{backgroundColor:d.color}}>
                        <h5 className="text-white">{d.title} </h5>
                      </div>
                  </Link>
                    <div className="card-body">
                     <div className="row">
                        <div className="col-md-4 text-center">
                          <Link to={`note/${d.slug}`} className="badge badge-primary">
                            <i className="fas fa-eye" />
                          </Link>
                        </div>

                        <div className="col-md-4 text-center">
                          <Link to={`/contribute/${d.slug}`} href className="badge badge-warning">
                            <i className="fas fa-share" />
                          </Link>
                        </div>

                        <div className="col-md-4 text-center">
                          <span onClick={()=>deleteNote(d.slug)} className="badge badge-danger">
                            {
                              deleteLoader.slug === d.slug ? <Spinner/> :
                              <i className="fas fa-trash-alt" />
                            }
                          </span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
              {/* Row End */}
            </div>
            
            }

              {/* <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-dark">
                      <h5 className="text-white">Expense Vue</h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-warning text-center">
                      <h5 className="text-white">Vue </h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-danger">
                      <h5 className="text-white">Income Note</h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-primary">
                      <h5 className="text-white">For Laravel Vue</h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-warning text-center">
                      <h5 className="text-white">Vue </h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-danger">
                      <h5 className="text-white">Income Note</h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <a href="detail.html">
                </a><div className="card"><a href="detail.html">
                    <div className="card-header bg-primary">
                      <h5 className="text-white">For Laravel Vue</h5>
                    </div>
                  </a><div className="card-body"><a href="detail.html">
                    </a><div className="row"><a href="detail.html">
                      </a><div className="col-md-6 text-center"><a href="detail.html">
                        </a><a href className="badge badge-primary">
                          <i className="fas fa-eye" />
                        </a>
                      </div>
                      <div className="col-md-6 text-center">
                        <a href className="badge badge-warning">
                          <i className="fas fa-edit" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* For Load */}
            <div className="row">
              <div className="col-md-12 text-center">
                <button className="btn btn-primary btn-fab btn-icon btn-round"
                onClick={()=>renderNextPage()}
                disabled={nextPage === null ? true : false}>
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
    </div>
  </div>
    </Master>
  )
}

export default Home