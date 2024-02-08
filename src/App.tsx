import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const Users = lazy(() => import('./pages/Users'));
const Hotels = lazy(() => import('./pages/Hotels'));

const App: React.FC = () => (
  <Router>
     <Suspense fallback={<div>Loading...</div>}>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/users" element={<Users/>}>
      </Route>
      <Route path="/" element={<Hotels/>}>
      </Route>
    </Routes>
    </Suspense>
  </Router>
);
export default App;