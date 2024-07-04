import React, { useContext, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress,
  TablePagination
} from '@mui/material';
import { DepartmentContext } from '../context/DepartmentContext';
import SupplierFilter from './SupplierFilter';

const DepartmentList = () => {
  const { 
    departments, 
    loading, 
    error, 
    fetchDepartments, 
    supplier, 
    changeSupplier,
    page,
    rowsPerPage,
    totalCount,
    changePage,
    changeRowsPerPage
  } = useContext(DepartmentContext);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleChangePage = (event, newPage) => {
    changePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    changeRowsPerPage(parseInt(event.target.value, 10));
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="department-container">
    <div className="department-header">
      <h2>Department List</h2>
      <SupplierFilter 
        supplier={supplier} 
        onSupplierChange={changeSupplier}
      />
    </div>
      {loading ? (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      ) : (
        <div className="department-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S/N</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Cost Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>UPC</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.map((dept, index) => (
                  <TableRow key={dept.SKU}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>
                      <img src={dept.Image_1} alt={dept.Title} width="50" height="50" style={{ objectFit: 'cover', borderRadius: '4px' }} />
                    </TableCell>
                    <TableCell>{dept.SKU}</TableCell>
                    <TableCell>{dept.Title}</TableCell>
                    <TableCell>{dept.Description}</TableCell>
                    <TableCell>{dept['Cost Price']}</TableCell>
                    <TableCell>{dept.Quantity}</TableCell>
                    <TableCell>{dept.UPC}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;