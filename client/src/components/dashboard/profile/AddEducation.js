import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddEducation extends Component {
  render() {
    const { history } = this.props;
    return (
      <div className="add-experience">
        <div className="row">
          <div className="col-sm-8 m-auto">
            <div className="back-button">
              <FontAwesomeIcon
                onClick={this.goBackHandler}
                icon="arrow-alt-circle-left"
                className="mb-3"
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>
            <h4 className="mb-4">Add Education</h4>
          </div>
        </div>
      </div>
    );
  }
  // Go Back Handler
  goBackHandler = () => {
    const { history } = this.props;
    history.goBack();
  };
}

export default connect(null)(AddEducation);
