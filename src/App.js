import ContextMain from "./context/ContextMain";
import SingleComponent from "./components/SingleComponent";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="container py-5">
        <h2>Using State</h2>
        <SingleComponent />
      </div>

      <div className="container py-5">
        <h2>Using Context</h2>
        <ContextMain />
      </div>
    </div>
  );
}

export default App;
