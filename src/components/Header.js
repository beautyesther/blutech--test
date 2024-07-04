import React, { useState, useContext } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Badge, IconButton, Menu, MenuItem, Avatar, Box, Typography } from '@mui/material';
import { DepartmentContext } from '../context/DepartmentContext';
import { ReactComponent as Logo } from '../styles/assets/logo.svg';


const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchDepartments } = useContext(DepartmentContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      fetchDepartments(searchTerm);
    }
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="logo">
      <Logo />
      </div>
      <div className="search-bar">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search by patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearch}
        />
      </div>
      <div className="header-actions">
        <IconButton color="inherit">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Avatar 
            src="/path-to-profile-image.jpg" 
            alt="Deko" 
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Typography variant="body2" sx={{ mr: 0.5 }}>Deko</Typography>
          <IconButton onClick={handleDropdownClick} size="small">
            <ArrowDropDownIcon />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;