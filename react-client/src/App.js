// import logo from './logo.svg';
import { useState } from 'react';
import Nav from './components/nav';
import { PanelStageContext, DataContext } from './store';
import Authorization from './views/authorization';
import Panel from './views/panel';

function App() {
  // перенести контекстную логику на уровень выше
  const [page, selectPage] = useState('panel');
  const [stage, setStage] = useState('categories');
  const [updateData, toggleUpdateData] = useState(true);

  const [categories, updateCategories] = useState(null);
  const [requests, updateRequests] = useState(null);
  const [tables, updateTables] = useState(null);

  return (
    <div className='App'>
      
      <PanelStageContext.Provider value={{stage, updateData, setStage, toggleUpdateData}}>
        <DataContext.Provider value={{categories, requests, tables, updateCategories, updateRequests, updateTables}}>
          <Nav selectPage={selectPage} page={page}/>
          {page === 'panel' ? <Panel/> : <Authorization/> }
        </DataContext.Provider>
      </PanelStageContext.Provider>
    </div>
  );
}

export default App;
