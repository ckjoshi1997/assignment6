import ItemList from './ItemList.jsx';
// import ItemReport from './ItemReport.jsx';
import ItemEdit from './ItemEdit.jsx';
import About from './About.jsx';
import NotFound from './NotFound.jsx';

const routes = [
  { path: '/items/:id?', component: ItemList },
  { path: '/edit/:id', component: ItemEdit },
  //   { path: '/report', component: IssueReport },
  { path: '/about', component: About },
  { path: '*', component: NotFound },
];

export default routes;
