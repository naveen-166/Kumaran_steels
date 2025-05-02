import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BaseRoute from './BaseRoute';
import ProductDetails from './Components1/ProductDetails';
import ServiceDetail from './Components1/ServiceDetail';
import ServiceUpdater from './Components1/Services/ServiceUpdater'
import ProductList from './Components1/ProductManagment/ProductList'
import AdminPanel from './Components1/AdminPanel';
import Login from './Components1/Login';
import EnquireDisplay from './Components1/EnquireDisplay';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseRoute />} />
        <Route path="/ad/request" element={<EnquireDisplay/>} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/ad/adminlogin" element={<Login/>}/>
        <Route path="/admin-panel" element={<AdminPanel/>}/>
        <Route path="/admin/update-services" element={<ServiceUpdater/>}/>
        <Route path="/admin/update-products" element={<ProductList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
