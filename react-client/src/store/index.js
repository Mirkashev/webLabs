import { createContext } from 'react';

export const PanelStageContext = createContext(null);
// сторейдж ответов с сервера (данных), по логике при изменении состояния по зависимостям буду ре-рендерить компоненты
export const DataContext = createContext({
  categories:null,
  requests:null,
  tables:null,
  users:null,
  updateCategories:()=>{},
  updateRequests:()=>{},
  updateTables:()=>{},
  updateUsers:()=>{}
})