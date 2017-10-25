import React, {Component} from 'react';

export default class AssetContainer extends Component {


// displays assets (images, pdfs..) each with a download button across the top of the page

  render() {
    return (
      <div>
        <div className="form-group asset-toolbar" >
          <div className="card-block">
            <h4 className="card-title">Assets</h4>
            <p className="card-text">Assets to be sent via Email</p>
          </div>
          <form>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><a href={this.props.w9} download>w9</a></li>
              <li className="list-group-item"><a href={this.props.stage_plot} className="card-link" download>Stage Plot</a></li>
              <li className="list-group-item"><a href={this.props.input_list} className="card-link" download>Input List</a></li>
              <li className="list-group-item"><a href={this.props.hospitality_rider} className="card-link" download>Hospitality Rider</a></li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

AssetContainer.propTypes = {
};
