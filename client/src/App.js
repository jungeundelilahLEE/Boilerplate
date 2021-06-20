import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage"
import LoginPage from "./components/views/LoginPage/LoginPage"
import RegisterPage from "./components/views/RegisterPage/RegisterPage"
import Auth from "./hoc/auth"

export default function App() {
  return (
    <Router>
      <div>
        
        <Switch>
          <Route exact path="/" component = {Auth(LandingPage, null, true)}>
            {/* //! auth로 감싸주기 */}
          </Route>
          <Route exact path="/login" component = {Auth(LoginPage, false)}>
          </Route>
          <Route exact path="/register" component = {Auth(RegisterPage, false)}>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

//TODO  routing
//! <Route path="/"> <LandingPage /> </Route> 와
//! <Route path="/" component = {LandingPage}> </Route> 는 같음
//! exact 붙이는 거! 깜빡하지 말기!

// TODO proxy설정
//! Configuring the Proxy Manually 수동으로 프록시 설정
//! https://create-react-app.dev/docs/proxying-api-requests-in-development/ 여기를 참고
//!




