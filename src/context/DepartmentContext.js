import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const DepartmentContext = createContext();

export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [supplier, setSupplier] = useState('Morris Costumes');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchDepartments = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://3.88.1.181:8000/products/public/catalog', {
        params: {
          supplier: supplier,
          first: page * rowsPerPage,
          last: (page + 1) * rowsPerPage,
          search: searchTerm
        }
      });
      setDepartments(response.data);
      setTotalCount(response.headers['x-total-count'] || response.data.length);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, [supplier, page, rowsPerPage]);

  const changeSupplier = (newSupplier) => {
    setSupplier(newSupplier);
    setPage(0);
    fetchDepartments();
  };

  const changePage = (newPage) => {
    setPage(newPage);
    fetchDepartments();
  };

  const changeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchDepartments();
  };

  return (
    <DepartmentContext.Provider value={{ 
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
    }}>
      {children}
    </DepartmentContext.Provider>
  );
};