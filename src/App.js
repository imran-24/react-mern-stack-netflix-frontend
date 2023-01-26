import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login/Login";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "./pages/signup/SignUp";
import Watch from "./pages/watch/Watch";
import { useEffect } from "react";
import { fetchMovies, getGenres } from "./features/movie/netflixSlice";
import Movies from "./pages/movies/Movies";
import MyList from "./pages/mylist/MyList";


function App() {
  const {user} = useSelector((state) => state.auth);
  const genresLoaded = useSelector(state => state.netflix.genresLoaded);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user) navigate('/login')
    else{
      navigate('/')
    }
  },[user])
  const dispatch = useDispatch();
  const {genres} = useSelector((state) => state.netflix);
  
  useEffect(()=>{
    dispatch(getGenres())
  },[])
  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies({type: 'all'}))
  },[genres])


  return (
    <div className="app_container">

          {
            !user ?
                <Routes>
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/signup" element={ <SignUp /> } />
                </Routes>
             :
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/:type" element={ <Movies /> } />
                <Route path="/watch" element={ <Watch /> } />
                <Route path="/mylist" element={ <MyList /> } />
            </Routes>
          }
          

    </div>
  );
}

export default App;
