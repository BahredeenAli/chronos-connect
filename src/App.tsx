import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import WeeklySchedule from './pages/WeeklySchedule';
import RequestMeeting from './pages/RequestMeeting';

function App() {
  return (
    <Router>
      <Toaster richColors />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/weekly-schedule" element={<WeeklySchedule />} />
          <Route path="/request-meeting" element={<RequestMeeting />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
