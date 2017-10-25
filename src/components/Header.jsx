/* global gapi */
import React, {Component} from 'react';
import cookie from 'react-cookies';
import request from 'superagent';
import { Link } from 'react-router-dom';
import Logo from '../styles/two_tickets_white1600.png';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);

    this.state = {
      token: null
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
  }

    signOut() {
      // let auth2 = gapi.auth2.getAuthInstance();
      // auth2.signOut().then(function () {
      //   console.log('User signed out.');
      // });

      // this.logoutAtBackend();

      cookie.remove('token'); //deletes token from cookie
      this.setState({token: null});
      window.location.href = "/";
    }

    logoutAtBackend(){
      let setCookie = this.setCookie;
      request
        .post('https://ez-tour.herokuapp.com/send_event')
        .send( {email: this.state.email, event_hash: this.createEventHashPatch()})
        .set('Authorization', `Token token=${this.state.token}`)
        .end((err, res) =>{
          if(err) {
            console.log(err);
            console.log(res);
            this.setState({error: res.body.error});
          }
          if(res){
            console.log(res);
            this.props.closeEmailWindow();
          }
        })
    }

  render() {
    return (
      <nav className="navbar navbar-light bg-faded">
        <a className="navbar-brand" >
          <img src={Logo} width="50" height="50" className="d-inline-block " alt=""/>
          EZ Tour
        </a>
        {this.props.display &&
          <div>
            <h2>{this.props.display}</h2>
          {this.props.display==='Dashboard' &&
            <div className="create-new-event-button">
              <div><button className="button create-new-event-button"><Link to="/event-form">Create New Event</Link></button></div>
            </div>
          }
          </div>
        }
        {this.state.token &&
          <div className="sign-out-button">
            <a className="button sign-out-button" onClick={this.signOut}>Sign out</a>
          </div>
        }
      </nav>
    );
  }
}

// function signOut() {
//   let auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }
// Header.propTypes = {
// };
