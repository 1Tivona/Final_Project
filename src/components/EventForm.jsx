// component
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import EventBandView from './EventBandView.jsx';
import EventVenueView from './EventVenueView.jsx';
import ProfileMini from './ProfileMini.jsx';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import cookie from 'react-cookies';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);

    this.state = {
      newEvent: false,
      displayBandView: true,
      dropdownOpen: false,
      token: null,
      userId: null,
      bandsId: null,
      eventTokenFromHash: null
    }
  }

// need a function to catch token from url if coming from an email. This will cause VenueView to render.

  fxnToGrabTokenFromUrl(){ //finish writing!
    // doTheThing()
    // this.setState({eventTokenFromHash: theHash, displayBandView: false});
  }

  // apply props to conditionally render either EventBandView or EventVenueView
  componentWillMount(){ //finish writing!
    if(this.props.displayNew || this.props.bandsId){
      this.setState({displayBandView: true});
    }
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')});
  }

  componentDidMount(){
    if(!this.state.token || this.state.eventTokenFromHash){
      window.location.href = "/";
    }
    console.log(this.props.bandsId+" "+this.props.eventToken+" "+this.props.displayNew);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

// if displayNew then dropdown needs to show list of bands. If only one, then auto select. Pass displayButtons as props.
  render() {
    return (
      <div>
      {/* <ProfileMini/> */}
        <div className="d-flex justify-content-between">
          <div><button className="button create-new-event-button"><Link to="/dashboard">Dashboard</Link></button></div>
          {this.props.displayNew ?
            <h1>New Event for</h1> :
            <h1>Scheduled Event</h1>
          }
          <div>
            <Dropdown className="button create-new-event-button" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
               <DropdownToggle caret className="button create-new-event-button">
                 Edit Profile
               </DropdownToggle>
               <DropdownMenu>
                 {/* <DropdownItem header>Header</DropdownItem> */}
                 {/* <DropdownItem disabled>Action</DropdownItem> */}
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: true} }}>User Profile</Link></DropdownItem>
                 <DropdownItem divider />
                 <DropdownItem><Link to={{ pathname: "/profile-page", state: { userProfile: false} }}>Band Profile</Link></DropdownItem>
               </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {this.state.displayBandView ?
          <EventBandView bandsId={this.props.bandsId} displayNew={this.props.displayNew} eventToken={this.props.eventToken} noLongerNew={this.props.noLongerNew}/> :
          <EventVenueView eventToken={this.state.eventTokenFromHash}/>
        }
      </div>
    );
  }
}
EventForm.propTypes = {
  // displayNew.boolean
  // bandsId.number
};
