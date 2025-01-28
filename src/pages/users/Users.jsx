import React, { 
    useEffect,
    // useRef,
     useState } from 'react'
import Tables from '../../components/tables/Tables'
import { Buttons } from '../../assets/button/Buttons'
import Modals from '../../assets/modals/Modals'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../redux-store/users/userSlice'
import { useSelector } from 'react-redux'
// import { Inputs } from '../../assets/input/Inputs'

export const Users = () => {
    const [isModalOpen , setIsModalOpen] =useState(false)
    const dispatch=useDispatch()
    const getusersData = useSelector(
        (state) => state.user?.user
      );
      
    useEffect(() =>{
       dispatch(getUsers())
        
    }, [dispatch])
    const handleuserAddModal=(() =>{
        setIsModalOpen(true)
    })
   const credentislList=[
    {
        placeholder:"Enter Name",
        type:"text",
        label:"User Name"
    },
    {
        placeholder:"Enter Eamil",
        type:"email",
        label:"User Email"
    },
    {
        placeholder:"Enter Passworrd",
        type:"password",
        label:"User Password"
    },
   ]
  return (
    <div className='User-parrent'>
        <div className='button-parrent my-2'>
        <Buttons className="text-white border-0" onClick={handleuserAddModal} text="Add User"  />
        </div>
        <div className='table-parrent'>
        <Tables data={getusersData} />
        </div>
        {isModalOpen && <Modals isModalOpen={isModalOpen} body={credentislList} title="Add User" setIsModalOpen={setIsModalOpen}  />}

    </div>
  )
}
