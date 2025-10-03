import { RouterProvider } from 'react-router-dom'
import AppRouter from './routes/Approuter'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    
    <RouterProvider router={AppRouter()}/>
    <Toaster/>
    </>
  )
}

export default App