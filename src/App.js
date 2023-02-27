
import "..//node_modules/bootstrap/dist/js/bootstrap.bundle";
import './App.scss';
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';
import CsvTable from "./pages/CsvTable";
// import Exportable from "./pages/Exportable";

function App() {
  return (
    <>
      <CsvTable />
      {/* <Exportable /> */}
      <ToastContainer />
    </>
  );
}

export default App;
