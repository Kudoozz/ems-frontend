import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/EmployeeHelper'
import axios from 'axios'




const List = () => {
    const [employees, setEmployees] = useState([])
    const [emploading, setEmploading] = useState(false);
    const [filteredEmployee,setFilteredEmployees]=useState([])



    useEffect(() => {
        const fetchEmployees = async () => {
            setEmploading(true)
            try {
                const response = await axios.get('http://localhost:2111/api/employee', {
                    headers:
                    {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    let sno = 1
                    const data = await response.data.employees.map((emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name,
                            name: emp.userId.name,
                            dob: new Date(emp.dob).toLocaleDateString(),
                            profileImage:<img width={37} className='rounded-full' src={`http://localhost:2111/${ emp.userId.profileImage}`}/>,
                            action: (<EmployeeButtons _id={emp._id} />)
                        }
                    ))
                    setEmployees(data);
                    setFilteredEmployees(data);

                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }

            }
            finally {
                setEmploading(false)
            }
        };
        fetchEmployees();



    }, [])


    const handleFilter=(e)=>
    {
        const records=employees.filter((emp)=>
        (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }





    return (
        <div className='p-6'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Employees</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input 
                type="text" 
                placeholder='Search by employee name'
                className='px-4  py-0.5'
                onChange={handleFilter}

                />
                <Link to="/admin-dashboard/add-employee" className='px-4 py-1 bg-teal-600 rounded text-white'>Add New Employee</Link>
            </div>
            <div className='mt-6'>
                <DataTable columns={columns} data={filteredEmployee} pagination/>
            </div>
        </div>
    )
}

export default List