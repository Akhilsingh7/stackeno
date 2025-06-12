import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userProfileGet } from './userReducer/userProfileSlice';

const App = () => {
 
  const { isLoggedIn , user } = useSelector((state) => state.userProfile);


  
  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Home Page</h1>
      {isLoggedIn ?   <p className="text-gray-600">You are logged in!</p> : <p className="text-gray-600">You are not logged in!</p>}
      {
        isLoggedIn && <p className="text-gray-600">Welcome {user?.username}</p>
      }
    </div>
  )
}

export default App;
