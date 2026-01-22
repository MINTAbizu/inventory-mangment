// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import ItemRegisteration from './pages/ItemRegisteration';
// import Sidebar from './pages/Sidebar';
// import Items from './pages/items/Items';
// import Additems from './pages/items/Additems';
// import SalesGraph from './pages/items/SalesGraph';
// import StatusGraph from './pages/items/StatusGraph ';

// function App() {
//   return (
    // <Router>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route
    //         path="/dashboard"
    //         element={
    //           // <ProtectedRoute>
    //             <Dashboard />
    //           // </ProtectedRoute>
    //         }
    //       />
    //       <Route path="/" element={<Navigate to="/dashboard" replace />} />
    //       <Route path="/ItemRegisteration" element={<ItemRegisteration/>} />
    //       <Route path="/Sidebar" element={<Sidebar/>} />
    //       <Route path="/Items" element={<Items/>} />
    //       <Route path="/Additems" element={<Additems/>} />
    //       <Route path="/StatusGraph" element={<StatusGraph/>} />
    //     </Routes>
    //   </AuthProvider>
    // </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Items from './Items';
import { StatusProvider } from './context/StatusContext'; // Import the StatusProvider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ItemRegisteration from './pages/ItemRegisteration';
import Sidebar from './pages/Sidebar';
import Items from './pages/items/Items';
import Additems from './pages/items/Additems';
import SalesGraph from './pages/items/SalesGraph';
import StatusGraph from './pages/items/StatusGraph ';
import StatusPage from './pages/items/StatusPage';
import Sales from './pages/items/sales/Sales.';
import HomePage from './pages/HomePage';
function App() {
    return (
        <StatusProvider>
               <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/HomePage" replace />} />
          <Route path="/ItemRegisteration" element={<ItemRegisteration/>} />
          {/* <Route path="/Sidebar" element={<Sidebar/>} /> */}
          <Route path="/Items" element={
            <Sidebar >
            <Items/>

            </Sidebar >
            
            } />
          <Route path="/Additems" element={<Additems/>} />
          <Route path="/StatusPage" element={<StatusPage/>} />
          <Route path="/sales" element={<Sales/>} />
          <Route path="/HomePage" element={<HomePage/>} />
        </Routes>
        
      </AuthProvider>
    </Router>
        </StatusProvider>
    );
}

export default App;