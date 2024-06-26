import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import { useState } from 'react';

// Components
import Login from './components/account/Login'
import Home from './components/home/Home'
import Header from './components/header/Header';
import CreatePosts from './components/create/CreatePosts';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';

const PrivateRoute = ({isAuthenticated, ...props}) => {
  return isAuthenticated ?
    <>
      <Outlet />
      <Header />
    </>
  :
    <Navigate replace to='/login' />
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        
        <div style={{marginTop: '64px'}}>
          <Routes>
            <Route path='/login'  element={ <Login isUserAuthenticated={isUserAuthenticated} /> }/>

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/'  element={ <Home /> }/>
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create'  element={ <CreatePosts /> }/>
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id'  element={ <DetailView /> }/>
            </Route>  

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id'  element={ <Update /> }/>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  )
}

export default App
