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

export class Register extends Component {
  state = {
    modal: false,
    form: {
      name: "",
      password: "",
      password2: "",
      secret: ""
    }
  };

  toggle = () => {
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

    //this.props.addMeal(this.state.meal);

    this.toggle();
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
                  onChange={this.changeHandler}
                  placeholder="Username..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password"
                  type="password"
                  onChange={this.changeHandler}
                  placeholder="Password..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="password2"
                  type="password"
                  onChange={this.changeHandler}
                  placeholder="Confirm Password..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="secret"
                  type="text"
                  onChange={this.changeHandler}
                  placeholder="Unlock Code"
                />
              </FormGroup>
              <div className={errorBox}>Error</div>
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

export default connect(mapStateToProps)(Register);
