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
import { login } from "../../actions/user_actions/userActions";
import classNames from "classnames";

export class Login extends Component {
  state = {
    modal: false,
    form: {
      name: "",
      password: ""
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

    let user = {
      username: this.state.form.name,
      password: this.state.form.password
    };
    this.props
      .login(user)
      .then(res => this.toggle())
      .catch(err => console.log(JSON.stringify(err)));
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
        <div onClick={this.toggle}>Login</div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  onChange={this.changeHandler}
                  placeholder="Username..."
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  onChange={this.changeHandler}
                  placeholder="Password..."
                />
              </FormGroup>
              <div className={errorBox}>Incorrect username or password</div>
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
  { login }
)(Login);
