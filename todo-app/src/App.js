import { useEffect, useState } from 'react';
import './App.css';
import MainComponent from './components/MainComponent/MainComponent';
import Sidebar from './components/Sidebar/Sidebar';
import apiCall from './components/utils/apicalls';

function App() {
  const [theme , setTheme] = useState("dark") ;
  const [userInfo,setUserInfo] = useState() ;

  useEffect(()=>{
    (async () => {
      const {err,data}= await apiCall("userVerify") ;
      if(err)
      {
        setUserInfo("") ;
      }
      else 
      {
        setUserInfo(data) ;
      }
    })() ;

  },[]);
  
  return (
    <div className="app">
      <Sidebar userInfo={userInfo} setUserInfo={setUserInfo} />
      <MainComponent
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        theme={theme}
        setTheme={setTheme}
      />
    </div>
  );
}

export default App;
