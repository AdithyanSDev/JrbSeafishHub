
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./assets/styles/bootstrap.min.css";
import "./assets/styles/style.css";


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <App />
</Provider>,
)
