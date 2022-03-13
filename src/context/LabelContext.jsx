import React,{useEffect} from 'react'
import ax from './../ax';

const LabelContext = React.createContext();

export const LabelContextProvider=(props)=>{

    const [label,setLabel] = React.useState([]);
    const [loader,setLoader] = React.useState(true);
    const [selectedLable,setSelectedLabel] = React.useState(null);
    
    // const token = localStorage.getItem("token");

    // useEffect(()=>{
    //     ax.get("/category",{headers : {Authorization:"Bearer " + token}}).then(
    //         (d)=>{
    //         const {data} = d.data;
    //         setLabel(data);
    //         setLoader(false);
    //     }) 

    // },[])



    return(
        <LabelContext.Provider 
        value={{
            label,
            setLabel,
            loader,
            setLoader,
            selectedLable,
            setSelectedLabel
            }}>
            {props.children}
        </LabelContext.Provider>
    )
}


export default LabelContext;