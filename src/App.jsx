import Login from './pages/Login'
import Register from './pages/Register'
import Data from './pages/Data'
import {Toaster} from 'react-hot-toast'
import {Routes,Route} from 'react-router-dom'
import Protect from './pages/Protect'
import Loader from '../components/Loader'


function App() {


  return (
    <>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
          
    <Routes>
      <Route path='/' Component={Login} />
      <Route path='/register' Component={Register} />
      <Route path='/data' element={<Protect children={<Data />} />} />
      <Route path='*' Component={<h1>404 Not found</h1>} />
      
    </Routes>
     
    </>
  )
}

export default App
