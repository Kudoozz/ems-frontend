import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const Detail = () => {
    const { id } = useParams()
    const [leave, setLeave] = useState(null)
    const navigate=useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {

            try {
                const response = await axios.get(`https://ems-api-gamma.vercel.app/api/leave/detail/${id}`, {
                    headers:
                    {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data);

                if (response.data.success) {
                    setLeave(response.data.leave)
                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }

            }

        };
        fetchLeave();



    }, []);


    const changeStatus=async(id, status)=>
    {

        try {
            const response = await axios.put(`https://ems-api-gamma.vercel.app/api/leave/${id}`,{status}, {
                headers:
                {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data);

            if (response.data.success) {
                navigate('/admin-dashboard/leaves')
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }

        }
    }



    return (
        <>{leave ? (
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-8 text-center'>Leave Detail</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <img src={`https://ems-api-gamma.vercel.app/${leave.employeeId.userId.profileImage}`} className='rounded-full border-4 border-gray-500 h-72 w-72 object-fill' alt='' />
                    </div>
                    <div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Name :</p>
                            <p className='font-medium mt-0.5 '>{leave.employeeId.name}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Employee ID :</p>
                            <p className='font-medium  mt-0.5'>{leave.employeeId.employeeId}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Leave Type :</p>
                            <p className='font-medium mt-0.5 '>{leave.leaveType}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Reason :</p>
                            <p className='font-medium  mt-0.5'>{leave.reason}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Department :</p>
                            <p className='font-medium mt-0.5'>{leave.employeeId.department.dep_name}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>Start Date :</p>
                            <p className='font-medium mt-0.5'>{new Date(leave.startDate).toLocaleDateString()}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>End Date :</p>
                            <p className='font-medium mt-0.5'>{new Date(leave.endDate).toLocaleDateString()}</p>
                        </div>
                        <div className='flex space-x-3 mb-2'>
                            <p className='text-lg font-bold'>


                                {leave.status === "Pending" ? "Action:" : "Status :"}

                            </p>

                            {leave.status === "Pending" ? (
                                <div className='flex space-x-2'>
                                    <button 
                                    className='px-2 py-0.5 bg-teal-300 hover:bg-teal-400'
                                    onClick={()=>changeStatus(leave._id, "Approved")}
                                    
                                    >Approve</button>
                                    <button 
                                    className='px-2 py-0.5 bg-red-300 hover:bg-red-400'
                                    onClick={()=>changeStatus(leave._id, "Rejected")}


                                    >Reject</button>
                                </div>
                            ) :
                                <p className='font-medium mt-0.5'>{leave.status}</p>
                            }




                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        ) : <div>Loading...</div>}</>
    )
}

export default Detail