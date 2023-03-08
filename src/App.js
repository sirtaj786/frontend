
import { useSelector } from 'react-redux';
import './App.css';
import MainRoute from './Component/MainRoute';

function App() {
  // const{state}=useSelector((store)=>store.pro)
  // console.log(state)
  return (
    <div className="App">
      <h1>Twin Leaves</h1>
      
      <MainRoute/>
     
    </div>
  );
}

export default App;
