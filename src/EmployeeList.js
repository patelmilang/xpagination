import React, { useState, useEffect } from "react";


const EmployeeList = () => {
  const [data, setData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert('failed to fetch data');
    }
  };
   
  useEffect(() => {
    

    fetchData();
  }, []);

  
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = data.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(data.length / recordsPerPage);
  
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Employee Data Table</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePrev}
          //disabled={currentPage === 1}
          style={{
            display:currentPage === 1?"none":"block"
          }}
        >
          Previous
        </button>
        <span className="pagination-info">{currentPage}</span>
        <button
          className="pagination-button"
          onClick={handleNext}
          //disabled={currentPage === totalPages}
          style={{
            display:currentPage === totalPages?"none":"block"
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
