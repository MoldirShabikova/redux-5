import { useSelector } from "react-redux";
import "./App.css";
import Header from "./Components/Header";
import LoadingPage from "./Components/LoadingPage";
import MainDisplay from "./Components/MainDisplay";
import OptionDisplay from "./Components/OptionDisplay";
import { selectDisplay } from "./redux/slices/displayCountrySlice";
import { selectLoading } from "./redux/slices/loadingSlice";

function App() {
  let currentDisplay = useSelector(selectDisplay);
  let isLoading = useSelector(selectLoading);
  return (
    <div className="App font-link">
      {isLoading && <LoadingPage />}
      <Header />
      {currentDisplay ? <MainDisplay /> : <OptionDisplay />}
    </div>
  );
}

export default App;
