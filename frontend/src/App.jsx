import Login from "./Components/Login"
import {Routes,Route} from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import PrivateRoute from "./Components/PrivateRoute"
import LeftSidebar from "./Components/LeftSidebar"
import ProtectedLayout from "./Components/ProtectedLayout"
import AddAgent from "./Pages/AddAgent"
import UploadCsv from "./Pages/UploadCsv"
function App() {

  return (
    <div>
      

      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={
          <PrivateRoute>
            <ProtectedLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="/add-agent" element={<AddAgent />} />
          <Route path="/upload-csv" element={<UploadCsv />} />
        </Route>

      </Routes>
      
      
    </div>
  )
}

export default App
