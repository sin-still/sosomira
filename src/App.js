import { Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './components/MainPage';
import Interior from './pages/Interior';
import Kitchen from './pages/Kitchen';
import Light from './pages/Light';
import Fabric from './pages/Fabric';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadPage from './components/UploadPage';
import ProductPage from './components/ProductPage';
import SignUpForm from './pages/SignUpForm';
import { AccessTokenProvider } from './components/AccessTokenContext';




function App() {

  return (
    <AccessTokenProvider>
      <div className="App">
        <Header/>
          <Routes>
            <Route path='/' element={ <MainPage />} />
            <Route path='/interior' element={ <Interior />} />
            <Route path='/kitchen' element={ <Kitchen />} />
            <Route path='/light' element={ <Light />} />
            <Route path='/fabric' element= {<Fabric />} />
            <Route path='/uploadpage' element= {<UploadPage />} />
            <Route path='/productpage/:id' element= {<ProductPage />} />
            <Route path='/signup' element= {<SignUpForm />} />
          </Routes>
        <Footer />
      </div>
    </AccessTokenProvider>
  );
}

export default App;