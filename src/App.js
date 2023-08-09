import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './components/MainPage';
import Interior from './pages/Interior';
import Kitchen from './pages/Kitchen';
import Office from './pages/Office';
import Fabric from './pages/Fabric';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadPage from './components/UploadPage';
import ProductPage from './components/ProductPage';


function App() {
  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={ <MainPage />} />
        <Route path='/interior' element={ <Interior />} />
        <Route path='/kitchen' element={ <Kitchen />} />
        <Route path='/office' element={ <Office />} />
        <Route path='/fabric' element= {<Fabric />} />
        <Route path='/uploadpage' element= {<UploadPage />} />
        <Route path='/productpage/:id' element= {<ProductPage />} />
      </Routes>

      <Footer />
      

    </div>
  );
}

export default App;
