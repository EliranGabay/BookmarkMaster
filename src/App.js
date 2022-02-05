import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { Route, Routes  } from "react-router-dom";
import { routes } from './routes';

import Navigation from "./components/Navigation/Navigation"

function App() {
  return (
    <div className="app">
      <Navigation />
      <Routes >
        {routes && routes.map(route => <Route key={route.path} exact element={<route.component/>} path={route.path} />)}
    </Routes >
    </div>
  );
}

export default App;
