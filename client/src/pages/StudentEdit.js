// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Utils from "../utils/utils";

// Redux
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// Material UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Custom Actions


// START IMPORT ACTIONS
import StudentActions from "../redux/actions/StudentActions";

// END IMPORT ACTIONS

/** APIs

* actionsStudent.create
*	@description CRUD ACTION create
*
* actionsStudent.update
*	@description CRUD ACTION update
*	@param ObjectId id - Id
*
* actionsStudent.get
*	@description CRUD ACTION get
*	@param ObjectId id - Id resource
*

**/

class StudentEdit extends Component {
  // Init student
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
  }

  // Load data on start
  componentDidMount() {
    if (this.props.match.params.id !== "new") {
      this.props.actionsStudent.loadStudent(this.props.match.params.id);
    }
    
  }

  // Insert props student in state
  componentWillReceiveProps(props) {
    this.setState(...this.state, {
      student: props.student
    });
  }

  // Save data
  save(event) {
    event.preventDefault();
    if (this.state.student._id) {
      this.props.actionsStudent.saveStudent(this.state.student).then(data => {
        this.props.history.push("/students/");
      });
    } else {
      this.props.actionsStudent.createStudent(this.state.student).then(data => {
        this.props.history.push("/students/");
      });
    }
  }

  // Show content
  render() {
    return (
      <div>
        <h1>Student Edit</h1>
        <form className="myForm" onSubmit={this.save.bind(this)}>

          
          <TextField
            id="adresse"
            label="Adresse"
            value={this.state.student.adresse || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="cin"
            label="Cin"
            value={this.state.student.cin || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="filiere"
            label="Filiere"
            value={this.state.student.filiere || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
            fullWidth
          />
          
          
          <TextField
            id="firstName"
            label="FirstName"
            value={this.state.student.firstName || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.student.firstName && this.state.student.firstName === ""
              ? { error: true }
              : {})}
          />
          
          
          <TextField
            id="lastname"
            label="Lastname"
            value={this.state.student.lastname || ""}
            onChange={Utils.handleChange.bind(this, "student")}
            margin="normal"
            fullWidth
            required
            {...(!this.state.student.lastname && this.state.student.lastname === ""
              ? { error: true }
              : {})}
          />
          

          {/* Footer */}
          <div className="footer-card">
            <Link to="/students/">Back to list</Link>

            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store actions
const mapDispatchToProps = function(dispatch) {
  return { 
    actionsStudent: bindActionCreators(StudentActions, dispatch),
  };
};

// Validate types
StudentEdit.propTypes = { 
  actionsStudent: PropTypes.object.isRequired,
};

// Get props from state
function mapStateToProps(state, ownProps) {
  return {
    student: state.StudentEditReducer.student
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentEdit);
