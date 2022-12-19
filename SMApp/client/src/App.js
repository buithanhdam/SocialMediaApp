
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/home/Home';
import ProfilePage from './pages/Profile/ProfilePage';
import {useSelector} from'react-redux';
import {Navigate,Route,Routes} from 'react-router-dom';


function App() {
  const user = useSelector((state) => {return state.authReducer.authData});
  return (
    <div className="App">
      {/* <Home /> */}
      {/* <ProfilePage /> */}
      <Routes>
        <Route path="/" element={user?<Navigate to="home"/>:<Navigate to="auth"/>}/>
        <Route path="/home" element={user?<Home />:<Navigate to="../auth"/>}/>
        <Route path="/auth" element={user?<Navigate to="../home"/>:<Auth />}/>
        <Route path="/profile/:id" element={user?<ProfilePage/>:<Navigate to="../auth"/>}/>
      </Routes>
    </div>
  );
}

export default App;
