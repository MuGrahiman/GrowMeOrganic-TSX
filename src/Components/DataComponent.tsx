import React, { useState, useEffect } from 'react';
import Table from './Table'; // Adjust the path based on your project structure
import axios from 'axios';
import DepartmentList from './DepartmentList';
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
const TableList: React.FC = () => {
  const [apiData, setApiData] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const data = await response.data;
        console.error(data);
        
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'userId', headerName: 'User ID', width: 120 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 300 },
  ];
  const departmentsData = [
    {
      department: 'customer_service',
      sub_departments: ['support', 'customer_success'],
    },
    {
      department: 'design',
      sub_departments: ['graphic_design', 'product_design', 'web_design'],
    },
  ];
  return (
    <div>
      <h1>Your Application</h1>
      {apiData.length > 0 ? (
        <Table rows={apiData} columns={columns} />
      ) : (
        <p>Loading data...</p>
      )}
      {/* <Table rows={dynamicRows} columns={dynamicColumns} /> */}
      <DepartmentList data={departmentsData} />

    </div>
  );
};

export default TableList;
