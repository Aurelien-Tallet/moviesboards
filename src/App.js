import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Movies from './pages/Movies/Movies.js'
import AddMovie from './pages/AddMovie/AddMovie.js'
import './App.scss';
import DetailMovie from "components/DetailMovie/DetailMovie.js";

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
        <Route path="/movies/:id">
          <DetailMovie />
        </Route>
        <Route exact path="/add">
          <AddMovie />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
