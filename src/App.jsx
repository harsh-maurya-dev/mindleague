import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layouts/Layout'
import NoPage from './pages/NoPage'
import { Provider } from 'react-redux'
import { store } from '../store/store.js'
import DashboardDetails from './components/DashboardDetails.jsx'
import Player from './pages/Player.jsx'
import Alumni from './pages/Alumni.jsx'
import SkeletonTable from '../shimmer/SkeletonTable.jsx'
import "../languages/i18n.js"
import ContentManagement from './pages/ContentManagement.jsx'
import SubscribePlans from './pages/SubscribePlans.jsx'
import ContentDetails from './pages/ContentDetails.jsx'

function App() {
  const [isOpenNav, setIsOpenNav] = useState(false)
  // console.log(isOpenNav);
  

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout isOpenNav={isOpenNav} setIsOpenNav={setIsOpenNav}/>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-details/:id" element={<DashboardDetails />} />
            <Route path="/students-players" element={<Player />} />
            <Route path="/alumni-management" element={<Alumni />} />
            <Route path="/content-management" element={<ContentManagement />} />
            <Route path="/content-details/:id" element={<ContentDetails />} />
            <Route path="/subscription-plan" element={<SubscribePlans />} />
            <Route path="/shimmer" element={<SkeletonTable />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
