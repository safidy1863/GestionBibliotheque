import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";
//redux
import { Provider } from "react-redux";
import {applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { livres } from "./actions/livres.action";
import { prets } from "./actions/prets.action";
import { lecteurs } from "./actions/lecteurs.action";
import { historiquePret } from "./actions/historique.action";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(livres());
store.dispatch(prets());
store.dispatch(lecteurs());
store.dispatch(historiquePret());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById("root")
);
