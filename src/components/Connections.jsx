import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections)
  const fetchConnections = async ()=>{
    try{
        const res = await axios.get(BASE_URL + "/user/connections", {
            withCredentials: true,
        });
        console.log(res.data);
        dispatch(addConnections(res?.data?.data));
    }
    catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    fetchConnections();
  }, []);

  if(!connections) return;
  if(connections.length === 0) return <h1>No Connections Found</h1>

  return (
    <div className='text-center my-10'> 
    <div className='text-bold text-4xl'>Connections</div>
    {connections.map(connection => {
    const {_id,firstName, lastName, photoUrl, age, gender, about} = connection
       return (<div key={_id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
        <div> <img alt = "photo" className='w-20 h-30 rounded-full object-fill' src={photoUrl}/></div>
        <div className='text-left mx-4'>
             <h2 className='font-bold text-xl'>{firstName+" "+lastName}</h2>
             {age && gender && <p>{age +", "+ gender}</p>}
            <p>{about}</p>
        </div>
        </div>
)})}
    </div>
  )
}

export default Connections