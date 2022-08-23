import { useEffect, useState } from 'react'
import './App.css'
import { fetchUsers } from './redux/users';
import { useAppDispatch, useAppSelector } from './redux/hooks';

function App() {

  const dispatch = useAppDispatch();


  useEffect(() => {

    dispatch(fetchUsers())
  
  }, [])

  const data = useAppSelector(state => state)
  

  return (
    <div className="App">
        {data.loading && !data.error ? (<h1 style={{color:'white'}}>Loading....</h1>):null}
        { !data.loading && data.error ? (<h1 style={{color:'red'}}>{data.error}</h1>):null}
        { !data.loading && data.users.length>0 ? (
          <div>
            <h1 style={{color:'grey',marginBlock:'2vh',}}>Users</h1>
            {
              data.users.map((item,i) => (
                <h3 style={{color:'white'}} key={item.id}>{item.name}</h3>
              ))
            }
          </div>
        ):null}
    </div>
  )
}

export default App
