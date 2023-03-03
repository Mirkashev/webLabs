// import logo from './logo.svg';
import { useState } from 'react';
import Nav from './components/nav';
import { PanelStageContext, DataContext } from './store';
import Authorization from './views/authorization';
import Panel from './views/panel';

function App() {
  // перенести контекстную логику на уровень выше
  const [isAuth, toggleAuth] = useState(localStorage.getItem('token'));
  const [isRegistration, toggleRegistration] = useState(true);

  const [stage, setStage] = useState('categories');

  const [users, updateUsers] = useState(null);
  const [categories, updateCategories] = useState(null);
  const [requests, updateRequests] = useState(null);
  const [tables, updateTables] = useState(null);

  return (
    <div className='App'>
      <PanelStageContext.Provider value={{stage, setStage}}>
        <DataContext.Provider value={{categories, requests, tables, users, updateCategories, updateRequests, updateTables, updateUsers}}>
          <Nav toggleAuth={toggleAuth} isAuth={isAuth} toggleRegistration={toggleRegistration} isRegistration={isRegistration}/>
          {!!isAuth ? <Panel/> : <Authorization isRegistration={isRegistration} toggleRegistration={toggleRegistration} toggleAuth={toggleAuth}/> }
        </DataContext.Provider>
      </PanelStageContext.Provider>
    </div>
  );
}

export default App;
