import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './Components/Home'
import {Login} from './Components/Login'
import {Error} from './Components/Error'
import {Categories} from './Components/Categories'
import {AdminPanel} from './Components/Admin/AdminPanel'
import {ManageCategories} from './Components/Admin/ManageCategories'
import {ManagePosts} from './Components/Admin/ManagePosts'
import {ReadPost} from './Components/ReadPost'
import {ChangePassword} from './Components/Admin/ChangePassword'
import {PostsByCategory} from './Components/PostsByCategory'
import {NavigationBar} from './Components/NavigationBar'

function App() {
  return (
      <BrowserRouter>
          <h3 className="m-3 d-flex justify-content-center">Blog For Pr</h3>

          <NavigationBar/>

          <Switch>

              <Route path='/' component = {Home} exact/>
              <Route path='/Categories' component = {Categories} exact/>
              <Route path='/Login' component = {Login} exact/>
              <Route path='/AdminPanel' component = {AdminPanel} exact/>
              <Route path='/ManagePosts' component = {ManagePosts} exact/>
              <Route path='/ChangePassword' component = {ChangePassword} exact/>
              <Route path='/ManageCategories' component = {ManageCategories} exact/>
              <Route path='/ReadPost/:id' component = {ReadPost} exact/>
              <Route path='/PostsByCategory/:id' component = {PostsByCategory} exact/>
              <Route component = {Error} exact/>
          </Switch>

      </BrowserRouter>
  );
}

export default App;
