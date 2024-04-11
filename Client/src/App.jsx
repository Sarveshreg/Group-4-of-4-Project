
import './App.css'
import Navbar from './components/Navbar'
import Maincontent from './components/Maincontent'
import Footer from './components/Footer'
import loadGoogleMapsAPI from './components/UserComponent/loadGoogleMapsAPI'

loadGoogleMapsAPI();

function App() {


  return (
    <div className='main'>
      <Navbar />
      <Maincontent />
      <Footer />
    </div>
  )
}

export default App
