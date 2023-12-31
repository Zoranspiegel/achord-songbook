import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './components/Home';
import CreateEditSong from './components/CreateEditSong';
import SongDetails from './components/SongDetails';
import Chord from './components/Chord';
import './App.css';

export default function App() {
  const logged = useSelector((state) => state.loggedUser.status === 'logged');

  return (
    <div className='app__container'>
      <Routes>
        <Route path='/' element={<Home />} />
        {logged && <Route path='/song/details/:id' element={<SongDetails />} />}
        {logged && <Route path='/song/edit/:id' element={<CreateEditSong />} />}
        <Route path='/chord' element={<Chord name='Dm7b5' chord='x5656x' />}/>
        <Route path='*' element={<h1>404: Page Not Found!</h1>}/>
      </Routes>
    </div>
  );
}
