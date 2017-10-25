// container
import React, {Component} from 'react';
import request from 'superagent';
import cookie from 'react-cookies';
import AssetToolbar from './AssetToolbar.jsx';
import SendAsEmailWindow from './SendAsEmailWindow.jsx';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.setImagesToSend = this.setImagesToSend.bind(this);
    this.createUrlForPatch = this.createUrlForPatch.bind(this);
    this.handleUpdateForm = this.handleUpdateForm.bind(this);
    this.displayEmailWindow = this.displayEmailWindow.bind(this);

    this.state = {
      displayEmailWindow: false,
      date: this.props.placeholders.date,
      venue: this.props.placeholders.venue,
      address_line_1: this.props.placeholders.address_line_1,
      city: this.props.placeholders.city,
      state: this.props.placeholders.state,
      venue_email: this.props.placeholders.venue_email,
      dos_contact: this.props.placeholders.dos_contact,
      dos_contact_email: this.props.placeholders.dos_contact_email,
      dos_contact_telephone: this.props.placeholders.dos_contact_telephone,
      parking: this.props.placeholders.parking,
      load_in_time: this.props.placeholders.load_in_time,
      load_in_location: this.props.placeholders.load_in_location,
      door_time: this.props.placeholders.door_time,
      set_time: this.props.placeholders.set_time,
      backline: this.props.placeholders.backline,
      hospitality: this.props.placeholders.hospitality,
      green_room: this.props.placeholders.green_room,
      showers: this.props.placeholders.showers,
      laundry: this.props.placeholders.laundry,
      wifi: this.props.placeholders.wifi,
      misc: this.props.placeholders.misc,
      w9: this.props.placeholders.w9,
	    stage_plot: this.props.placeholders.stage_plot,
      input_list: this.props.placeholders.input_list,
      hospitality_rider: this.props.placeholders.hospitality_rider,
      eventToken: this.props.placeholders.event_hash
    }
  }

  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
    console.log("Loading FormInput. BandsId is: "+this.props.bandsId+" Hash is: "+this.props.eventTokenFromHash);
  }

  updateFromField(stateKey) {
    return (event) => {
      this.setState({[stateKey]: event.target.value});
    }
  }

  setImagesToSend(){

  }

  displayEmailWindow(){
   //  render a <SendAsEmailWindow/> with a z-index
    //  event.preventDefault();
     this.setState({displayEmailWindow: !this.state.displayEmailWindow});
  }

  createUrlForPatch(){
    let url = ``;
    // if no bandId then just a URL for the user
    if(this.props.eventTokenFromHash){
      let hash = this.props.eventTokenFromHash;
      url = `https://ez-tour.herokuapp.com/events/${hash}`;
    }
    if(this.props.bandsId){
      let userId = this.state.userId;
      let bandsId = this.props.bandsId;
      let eventHash = this.state.eventToken;
      url = `https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events/${eventHash}`;
    }
    return url;
  }

 handleUpdateForm = (event) => {
 //needs to post to the DB and call an action for redux
  event.preventDefault();
   request
    .patch(this.createUrlForPatch())
    .send({date: this.state.date,
    venue: this.state.venue,
    address_line_1: this.state.address_line_1,
    city: this.state.city,
    state: this.state.state,
    dos_contact: this.state.dos_contact,
    dos_contact_email: this.state.dos_contact_email,
    dos_contact_telephone: this.state.dos_contact_telephone,
    parking: this.state.parking,
    load_in_time: this.state.load_in_time,
    load_in_location: this.state.load_in_location,
    door_time: this.state.door_time,
    set_time: this.state.set_time,
    backline: this.state.backline,
    hospitality: this.state.hospitality,
    green_room: this.state.green_room,
    showers: this.state.showers,
    laundry: this.state.laundry,
    wifi: this.state.wifi,
    misc: this.state.misc
    // w9: "",
    // stage_plot: "",
    // input_list: "",
    // hospitality_rider: ""
    })
    .set('Authorization', `Token token=${this.state.token}`)
    .end((err, res) =>{
      if(err) {
        this.setState({error: res.body.error});
      }
      if(res){
        console.log(res);
      }
    })
 }

  render() {
    return (
      <div>
        {this.props.bandsId &&
          <AssetToolbar bandsId={this.props.bandsId} setImagesToSend={this.setImagesToSend}/>
        }
        {this.props.placeholders &&
          <form>
            <div className="form-group">
              <label htmlFor="date">Date of Show:</label>
              <input className="form-control" onChange={this.updateFromField('date')}
                type="text" id="date" placeholder="YYYY-MM-DD  *needs to be in this format*" value={this.state.date} required/>
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue Name:</label>
              <input className="form-control" onChange={this.updateFromField('venue')}
                type="text" id="venue" placeholder="Name of Venue:" value={this.state.venue}/>
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue Address:</label>
              <input className="form-control" onChange={this.updateFromField('venue')}
                type="text" id="venue" placeholder="Address of Venue:" value={this.state.venue}/>
            </div>
            <div className="form-group">
              <label htmlFor="dos_contact">Day of Show Contact:</label>
              <input className="form-control"
                onChange={this.updateFromField('dos_contact')}
                type="text" id="dos_contact" placeholder="Venue Contact Name:"
                value={this.state.dos_contact}/>
            </div>
            <div className="form-group">
              <label htmlFor="dos_contact">Day of Event Contact Email:</label>
              <input className="form-control"
                onChange={this.updateFromField('dos_contact_email')}
                type="email" id="dos_contact_email" placeholder="Venue Contact Email:"
                value={this.state.dos_contact_email}/>
            </div>
            <div className="form-group">
              <label htmlFor="parking">Parking Instructions:</label>
              <input className="form-control"
                onChange={this.updateFromField('parking')} type="parking"
                id="parking" placeholder="Parking Instructions:" value={this.state.parking}/>
            </div>
            <div className="form-group">
              <label htmlFor="load_in_time">Load In:</label>
              <input className="form-control"
                onChange={this.updateFromField('load_in_time')}
                type="text" id="load_in_time" placeholder="Load In:" value={this.state.load_in_time}/>
            </div>
            <div className="form-group">
              <label htmlFor="load_in_location">Load In Location:</label>
              <input className="form-control"
                onChange={this.updateFromField('load_in_location')} type="text"
                 id="load_in_location" placeholder="Load In Location:"
                 value={this.state.load_in_location}/>
            </div>
            <div className="form-group">
              <label htmlFor="door_time">Door Time:</label>
              <input className="form-control"
                onChange={this.updateFromField('door_time')}
                type="text" id="door_time" placeholder="Door Time:" value={this.state.door_time}/>
            </div>
            <div className="form-group">
              <label htmlFor="set_time">Set Time:</label>
              <input className="form-control" onChange={this.updateFromField('set_time')}
                type="text" id="set_time" placeholder="Set Time:" value={this.state.set_time}/>
            </div>
            <div className="form-group">
              <label htmlFor="backline">Back Line:</label>
              <input className="form-control"
                onChange={this.updateFromField('backline')}
                type="text" id="backline" placeholder="Back Line:" value={this.state.backline}/>
            </div>
            <div className="form-group">
              <label htmlFor="hospitality">Hospitality:</label>
              <input className="form-control" onChange={this.updateFromField('hospitality')}
                type="text" id="hospitality" placeholder="Hospitality Offered:" value={this.state.hospitality}/>
            </div>
            <div className="form-group">
              <label htmlFor="green_room">Green Room:</label>
              <input className="form-control"
                onChange={this.updateFromField('green_room')}
                type="text" id="green_room" placeholder="Green Room Availability:" value={this.state.green_room}/>
            </div>
            <div className="form-group">
              <label htmlFor="showers">Showers:</label>
              <input className="form-control" onChange={this.updateFromField('showers')}
                type="text" id="showers" placeholder="Shower Availability:" value={this.state.showers}/>
            </div>
            <div className="form-group">
              <label htmlFor="laundry">Laundry:</label>
              <input className="form-control"
                onChange={this.updateFromField('laundry')}
                type="text" id="laundry" placeholder="Laundry Availability:" value={this.state.laundry}/>
            </div>
            <div className="form-group">
              <label htmlFor="wifi">WIFI Information:</label>
              <input className="form-control" onChange={this.updateFromField('wifi')} type="text"
                 id="wifi" placeholder="ex: Network name and password" value={this.state.wifi}/>
            </div>
            <div className="form-group">
              <label htmlFor="misc">Miscellaneous:</label>
              <textarea className="form-control"
                onChange={this.updateFromField('misc')}
                type="text" id="misc" placeholder="Other Information needed for Day of Event & or questions for performers" value={this.state.misc}/>
            </div>
            <div className="form-group">
              <button onClick={event => this.handleUpdateForm(event)} type="submit" className="btn btn-success">Save & Submit</button>
              {this.props.bandsId &&
                <button onClick={this.displayEmailWindow} type="button" className="btn btn-success">Email Form</button>
              }
            </div>
          </form>
        }
        {this.state.displayEmailWindow &&
          <SendAsEmailWindow closeEmailWindow={this.displayEmailWindow}
            eventTokenFromHash={this.props.eventTokenFromHash}
            eventToken={this.state.eventToken}
          />
        }
      </div>);
  }
}
FormInput.propTypes = {
  // placeholders: propTypes.object,
  // bandsId: propTypes.number
};
