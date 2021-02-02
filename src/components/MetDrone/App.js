import './App.css';
import Metronome from './Components/Metronome';
import { Drone } from './Components/Drone';

export const App = () => {
  return (
    <>
      <header>
        <h1 style={{textAlign:"center"}}>metdrone</h1>
      </header>
      <Metronome />
      <Drone />
    </>
  );
}