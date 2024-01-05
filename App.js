import MyApp from "./src/myApp";
import store from "./src/store";
import { Provider } from "react-redux";

function App() {


  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

export default App;
