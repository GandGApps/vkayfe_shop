import React, {useEffect} from 'react';
import MyApp from "./src/myApp";
import store from "./src/store";
import { Provider } from "react-redux";
import {requestUserPermission, notificationListener} from './src/helper/notificationServices.js'
import ForegroundHandler from './src/helper/ForegroundHandler';
function App() {
  useEffect(() => {
    requestUserPermission()
    notificationListener()

  }, [])

  return (
    <Provider store={store}>
      <ForegroundHandler />
      <MyApp />
    </Provider>
  );
}

export default App;
