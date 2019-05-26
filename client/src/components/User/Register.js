import React, { Component } from "react";
import "./user.css";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { connect } from "react-redux";
import classNames from "classnames";
import { setError, clearError } from "../../actions/user_actions/userActions";
import axios from "axios";

export class Register extends Component {
  state = {
    modal: false,
    form: {
      name: "",
      password: "",
      password2: "",
      secret: ""
    },
    error: "Unknown Error"
  };

  toggle = () => {
    this.props.clearError();
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  changeHandler = evt => {
    this.setState({
      form: { ...this.state.form, [evt.target.name]: evt.target.value }
    });
  };

  submitForm = evt => {
    evt.preventDefault();

    this.parseForm(this.state.form)
      .then(payload => axios.post("/api/users/register", payload))
      .then(res => {
        this.toggle();
      })
      .catch(err => {
        if (typeof err === "object") {
          err = err.response.data.msg;
        }
        this.props.setError(err);
        this.setState({
          error: err
        });
      });
  };

  parseForm = form => {
    return new Promise((resolve, reject) => {
      const { password, password2, name, secret } = form;
      const re = new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$");

      if (password2 !== password) {
        reject("Passwords do not match.");
      } else {
        if (password.length < 8) {
          reject("Password must be 8 or more characters.");
        } else {
          if (!password || !name || !secret) {
            reject("Fill out all fields.");
          } else {
            if (name.length < 3 || name.length > 16) {
              reject("Username must be between 3 and 16 characters.");
            } else {
              if (!re.test(password)) {
                reject(
                  "Password must include at least 1 uppercase character, 1 lowercase character, and 1 number."
                );
              } else {
                const payload = {
                  username: name,
                  password: password,
                  key: secret
                };
                resolve(payload);
              }
            }
          }
        }
      }
    });
  };

  render() {
    var errorBox = classNames({
      alert: true,
      "alert-danger": true,
      "login-error-hidden": !this.props.user.error,
      "login-error": this.props.user.error
    });

    return (
      <React.Fragment>
        <div onClick={this.toggle}>Register</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Register</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  name="name"
                  type="text"
                  required
                  minLength="3"
                  maxLength="16"
                  onChange={this.changeHandler}
                  placeholder="Username..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password"
                  type="password"
                  required
                  minLength="8"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
                  title="Please include at least 1 uppercase character, 1 lowercase character, and 1 number."
                  onChange={this.changeHandler}
                  placeholder="Password..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password2"
                  type="password"
                  required
                  onChange={this.changeHandler}
                  placeholder="Confirm Password..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="secret"
                  type="text"
                  required
                  onChange={this.changeHandler}
                  placeholder="Unlock Code"
                />
              </FormGroup>
              <div className={errorBox}>{this.state.error}</div>
              <Button className="wide-button" onClick={this.submitForm}>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { setError, clearError }
)(Register);
