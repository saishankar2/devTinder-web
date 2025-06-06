import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
 const dispatch  = useDispatch();
 const requests = useSelector(store => store.requests);

  const fetchRequest = async ()=>{
    try{
       const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
       });
       dispatch(addRequests(res.data.data));
    }
    catch(err){
       console.log("Error");
    }
  }
  const reviewRequest = async (status,_id)=>{
    try{
      const res = await axios.post(BASE_URL + "/request/review/"+status+"/"+_id, {}, {
        withCredentials: true
      });
      dispatch(removeRequest(_id));
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchRequest()
  }, [])
  if(!requests) return;
  if(requests.length === 0) return <h1>No Requests Found</h1>

  return (
    <div className='text-center my-10'> 
    <div className='text-bold text-4xl'>Requests</div>
    {requests.map(request => {
    const {_id, firstName, lastName, photoUrl, age, gender, about} = request.fromUserId
       return (<div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
        <div> <img alt = "photo" className='w-20 h-30 rounded-full' src={photoUrl}/></div>
        <div className='text-left'>
             <h2 className='font-bold text-xl'>{firstName+" "+lastName}</h2>
             {age && gender && <p>{age +", "+ gender}</p>}
            <p>{about}</p>
        </div>
        <div >
            <button className="btn btn-primary mx-2" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
            <button className="btn btn-secondary mx-2"onClick={()=>reviewRequest("rejected", request._id)}>Ignore</button>
        </div>
        </div>
)})}
    </div>
  )
}

export default Requests