import React,{Component} from 'react';
// import { Employee } from './Employee';
/*function LoginForm(props) {
    const nameEl = React.useRef(null);
    const passwordEl = React.useRef(null);
    const rememberMeEl = React.useRef(null);
  
    const handleSubmit = e => {
      e.preventDefault();
      const formData = {
        username: nameEl.current.value,
        password: passwordEl.current.value,
        rememberMe: rememberMeEl.current.checked,
      }
      console.log(formData);
    };
  
    
  }*/
import {Redirect} from 'react-router-dom';
export class Home extends Component{
    onSubmit = () => {
        
            return  <Redirect from="/" to="/Employee" />
        
     }
    
      render(){
        return (
            <form>
              <input type="text" placeholder="username"  />
              <input type="password" placeholder="password"  />
              <label>
                <input type="checkbox"  />
                Remember me
              </label>
              <button type="submit" onClick={this.onSubmit} className="myButton">Login</button>
            </form>
        );
      //<div><LoginForm /></div>, document.getElementById("root"));}
}
    /*render(){
        return(
            <div className="mt-5 d-flex justify-content-left">
                
            </div>
        )
    }*/
}