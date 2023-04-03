import { useEffect, useState } from 'react';
import Nav from './components/nav';
import Api from './services/api';
import { PanelStageContext, DataContext } from './store';
import Authorization from './views/panelPage/authorization';
import Panel from './views/panelPage/panel';
import {
  Route, Routes, useNavigate
} from "react-router-dom";
import Form from "./views/requestPage/form"

function App() {
  // перенести контекстную логику на уровень выше
  const [isAuth, toggleAuth] = useState(localStorage.getItem('token'));
  const [isRegistration, toggleRegistration] = useState(true);

  const [stage, setStage] = useState('categories');

  const [users, updateUsers] = useState(null);
  const [categories, updateCategories] = useState(null);
  const [requests, updateRequests] = useState(null);
  const [tables, updateTables] = useState(null);
  const [roles, updateRoles] = useState(null);

  useEffect(()=> {
    if(isAuth) {
      (async ()=> {
        const response = await Api.get({url:'categories', cache:'reload'});
        const parsedData = await response.json();
        if(response.ok) {
          updateCategories(parsedData);
        }else {
          alert(parsedData.message);
        }
      })();
    }
  }, [isAuth]);

  return (
    <div className='App'>
    <Routes>
      <Route index element={<Form/>}/>
      <Route path="/panel" element={<>
        <PanelStageContext.Provider value={{stage, setStage}}>
          <DataContext.Provider 
            value={{
              categories, 
              requests, 
              tables, 
              users, 
              roles, 
              updateCategories, 
              updateRequests, 
              updateTables, 
              updateUsers, 
              updateRoles}}>
            <Nav 
              toggleAuth={toggleAuth} 
              isAuth={isAuth} 
              toggleRegistration={toggleRegistration} 
              isRegistration={isRegistration}/>
            {!!isAuth ? 
            <Panel/> : 
            <Authorization 
              isRegistration={isRegistration} 
              toggleRegistration={toggleRegistration} 
              toggleAuth={toggleAuth}/> }
          </DataContext.Provider>
        </PanelStageContext.Provider>
      </>} />
      <Route path='*' element={<div>404</div>}/>
    </Routes>

    </div>
  );
}

export default App;
