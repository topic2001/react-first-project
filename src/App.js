import React from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import Hotel from './components/hotel/Hotel';
import Detail from './components/detail/Detail';
import Reserve from './components/reserve/Reserve';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ReserveInfo from './components/reserveInfo/ReserveInfo';
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute"

import st from './App.module.css';
import {BrowserRouter, Route, Switch, Link, NavLink, useParams} from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <div className={st.App}>
          <AuthProvider>
            <Header />
            <Switch>
              <Route exact path = "/"><Main /></Route>
              <Route path = "/hotel"><Hotel /></Route>
              <Route path = "/detail/:id"><Detail /></Route>
              <Route path = "/reserve/:hotelid/:roomid"><Reserve /></Route>
              <Route path = "/login"><Login /></Route>
              <Route path = "/signup"><Signup /></Route>
              <Route path = "/reserveInfo"><ReserveInfo /></Route>
              {/* <PrivateRoute path = "/reserveInfo" component={ReserveInfo} /> */}
              <Route path="/"><div className={st.notFound}>Not found</div></Route>
              {/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
            </Switch>
            <Footer />
          </AuthProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
