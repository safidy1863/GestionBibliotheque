import {BrowserRouter, Switch,Route} from "react-router-dom";
import Erreur from "./pages/Erreur";
import Home from "./pages/Home";
import Lecteurs from "./pages/Lecteurs";
import Livres from "./pages/Livres";
import Prets from "./pages/Prets";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/livres" component={Livres}/>
        <Route path="/lecteurs" component={Lecteurs}/>
        <Route path="/prets" component={Prets}/>
        <Route component={Erreur}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
