import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const suppliers = [
  'FragranceX',
  'FragranceNet',
  'Morris Costumes'
];

const SupplierFilter = ({ supplier, onSupplierChange }) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 200, mb: 2 }}>
      <InputLabel id="supplier-select-label">Supplier</InputLabel>
      <Select
        labelId="supplier-select-label"
        id="supplier-select"
        value={supplier}
        onChange={(e) => onSupplierChange(e.target.value)}
        label="Supplier"
      >
        {suppliers.map((s) => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SupplierFilter;