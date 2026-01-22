// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Select, MenuItem } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import CategoryIcon from '@mui/icons-material/Category';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import DescriptionIcon from '@mui/icons-material/Description';
// import GroupAddIcon from '@mui/icons-material/GroupAdd';
// import EditIcon from '@mui/icons-material/Edit';
// import InventoryIcon from '@mui/icons-material/Inventory';

// const Sidebar = () => {
//     return (
//         <Box
//             sx={{
//                 width: 250,
//                 bgcolor: 'background.paper',
//                 height: '100vh',
//                 padding: 2,
//                 position: 'fixed'
//             }}
//         >
//             <h2 style={{ textAlign: 'center' }}>Stock</h2>
//             <Divider />
//             <List>
//                 <ListItem component={Link} to="/">
//                     <ListItemIcon><DashboardIcon /></ListItemIcon>
//                     <ListItemText primary="Dashboard" />
//                 </ListItem>
//                 <ListItem component={Link} to="/Items">
//                     <ListItemIcon><InventoryIcon /></ListItemIcon>
//                     <ListItemText primary="Items" />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemIcon><CategoryIcon /></ListItemIcon>
//                     <Select defaultValue="" fullWidth>
//                         <MenuItem value="" disabled>Category</MenuItem>
//                         <MenuItem value="sales">Sales</MenuItem>
//                         <MenuItem value="transfers">Transfers</MenuItem>
//                        <Link to={'/StatusPage'}>  <MenuItem value="StatusPage">StatusPage</MenuItem></Link>
//                     </Select>
//                 </ListItem>
//                 <ListItem component={Link} to="/SalesGraph">
//                     <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
//                     <ListItemText primary="Sales" />
//                 </ListItem>
//                 <ListItem component={Link} to="/credits">
//                     <ListItemIcon><CreditCardIcon /></ListItemIcon>
//                     <ListItemText primary="Credits" />
//                 </ListItem>
//                 <ListItem component={Link} to="/activity">
//                     <ListItemIcon><DescriptionIcon /></ListItemIcon>
//                     <ListItemText primary="Activity Log" />
//                 </ListItem>
//                 <ListItem component={Link} to="/Register">
//                     <ListItemIcon><GroupAddIcon /></ListItemIcon>
//                     <ListItemText primary="User Management" />
//                 </ListItem>
//                 <ListItem component={Link} to="/users">
//                     <ListItemIcon><EditIcon /></ListItemIcon>
//                     <ListItemText primary="Edit Profile" />
//                 </ListItem>
//             </List>
//         </Box>
//     );
// };

// export default Sidebar;


import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">Inventory</h3>

      <div className="sidebar-links">
        <Link to="/" className="sidebar-link">Dashboard</Link>
        <Link to="/items" className="sidebar-link">Items</Link>
        <Link to="/additems" className="sidebar-link">Add Item</Link>
      </div>
    </div>
  );
}

export default Sidebar;
