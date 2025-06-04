import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Protected/ProtectedRoute.jsx"
import SignIn from './pages/Accounts/Sign-in/SignIn'
import LogOut from './pages/Accounts/Log-out/LogOut.jsx';
import Layout from "./components/Layout/Layout.jsx"
import Dashboard from "./pages/Dashboard/Dashboard.jsx"
import Clients from './pages/Clients/Clients.jsx';
import Contacts from "./pages/Contacts/Contacts.jsx"
import AllProjects from './pages/Projects/AllProject.jsx';
import AllMembers from './pages/Team/Allmembers.jsx';
import AddMember from './pages/Team/AddMember.jsx';
import Roles from './pages/Team/Roles.jsx';
import Tasks from './pages/Tasks/Tasks.jsx';
import Invoices from "./pages/Invoices/Invoices.jsx"
import Reports from './pages/Reports/Reports.jsx';
import SettingsPage from './pages/SettingsPage/SettingsPage.jsx'

import EditMember  from './pages/Team/EditMember.jsx'



function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/clients" element={<ProtectedRoute><Layout><Clients /></Layout></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><Layout><Contacts /></Layout></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Layout><AllProjects /></Layout></ProtectedRoute>} />
        <Route path="/team/all-members" element={<ProtectedRoute><Layout><AllMembers /></Layout></ProtectedRoute>} />
        <Route path="/team/add" element={<ProtectedRoute><Layout><AddMember /></Layout></ProtectedRoute>} />
        <Route path="/team/roles" element={<ProtectedRoute><Layout><Roles /></Layout></ProtectedRoute>} />
        <Route path="/team/edit/:id" element={<ProtectedRoute><Layout><EditMember /></Layout></ProtectedRoute>} />



        <Route path="/tasks" element={<ProtectedRoute><Layout><Tasks /></Layout></ProtectedRoute>} />
        <Route path="/invoices" element={<ProtectedRoute><Layout><Invoices /></Layout></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage /></Layout></ProtectedRoute>} />

        <Route path='/' element={<SignIn/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/logout' element={<LogOut/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
