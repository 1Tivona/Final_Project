import React, {Component} from 'react';
import FormInput from './FormInput.jsx';
import AssetToolbar from './AssetToolbar.jsx';
import cookie from 'react-cookies';
import request from 'superagent';
import NewFormInput from './NewFormInput.jsx';

export default class EventBandView extends Component {
// displays the asset tool bar on the side of the page.
  constructor(props) {
    super(props);

    this.state= {
      date: "",
      venue: "",
      city: "",
      state: "",
      dos_contact: "",
      parking: "",
      load_in_time: "",
      load_in_location: "",
      door_time: "",
      set_time: "",
      backline: "",
      hospitality: "",
      green_room: "",
      showers: "",
      laundry: "",
      wifi: "",
      misc: "",
      w9: "",
      stage_plot: "",
      input_list: "",
      hospitality_rider: "",
      eventInfo: null, //{} => placeholders
      token: null,
      userId: null
    }
  }
  componentWillMount(){
    this.setState({token: cookie.load('token'), userId: cookie.load('userId')}); //get token from cookie, if it exists
    if(!this.props.new){
      this.getFormData();
    }
  }


  getFormData(){
  //needs to post to the DB and call an action for redux
  //  event.preventDefault();
   let userId = this.props.userId; //or from Redux
   let bandsId = this.props.bandsId;
   let eventId = this.props.eventToken; //may need to change
    request
     .get(`https://ez-tour.herokuapp.com/users/${userId}/bands/${bandsId}/events/${eventId}`)
     .set('Authorization', `Token token=${this.props.token}`)
     .end((err, res) =>{
       if(err) {
         console.log(err);
         console.log(res);
         this.setState({error: res.body.error});
       }else{
         console.log(res);
         let Data = res.body.event;
         this.setState({eventInfo: Data});
         // setToken('578gh423rebz7zjeno99'); //for testing purposes
       }
     })
  }

// this.state.eventInfo is an object to map over
  render() {
    return (
      <div>
        <AssetToolbar bandId={this.props.bandId}/>
        {this.props.new ?
          <NewFormInput /> :
          <FormInput placeholders={this.state.eventInfo}/>
        }
      </div>
    );
  }
}

EventBandView.propTypes = {
};
