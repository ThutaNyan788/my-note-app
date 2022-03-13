import React from 'react'
import { Switch ,Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Auth/Login';
import Register from './Auth/Register';
import Create from './Pages/Note/Create';
import Edit from './Pages/Note/Edit';


//label
import CreateLabel from './Pages/Label/Create';
import EditLabel from './Pages/Label/Edit';
import All from './Pages/Label/All';
import SearchUser from './Contribute/SearchUser';
import AllReceive from './Contribute/AllReceive';
import AllContribute from './Contribute/AllContribute';


const MainRouter = () => {
  return (
    <Switch>
        <Route path='/' exact>
            <Home/>
        </Route>

        <Route path='/:category_slug/note' exact>
            <Home/>
        </Route>


        <Route path='/note/create' exact>
            <Create/>
        </Route>

        <Route path='/note/:slug' exact>
            <Edit/>
        </Route>

        <Route path='/login' >
            <Login/>
        </Route>


        <Route path='/register' >
            <Register/>
        </Route>


        {/* label */}
        <Route path='/label' exact >
            <All/>
        </Route>

        <Route path='/label/create' exact >
            <CreateLabel/>
        </Route>

        <Route path='/label/edit/:slug' exact >
            <EditLabel/>  
        </Route>

        {/* Contribute */}
        <Route path='/contribute/:slug' exact >
            <SearchUser/>  
        </Route>


        <Route path='/show/receive' exact >
            <AllReceive/>
        </Route>

        <Route path='/show/contribute' exact >
            <AllContribute/>
        </Route>

    </Switch>
  )
}

export default MainRouter