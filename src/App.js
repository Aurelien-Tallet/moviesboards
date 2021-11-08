import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Movies from './pages/Movies/Movies.js'
import SingleMovie from './pages/SingleMovie/SingleMovie.js'
import AddMovie from './pages/AddMovie/AddMovie.js'
import './App.scss';

function App() {
  return (<Router>

    <div className="App">
      <Switch>
        <Route exact path="/">
          <Redirect to="/movies" />
        </Route>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route path="/movie/:id">
          <SingleMovie />
        </Route>
        <Route exact path="/addmovie">
          <AddMovie />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
