import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinForm from '../components/JoinForm';
import LegalInfo from '../components/LegalInfo';
import { resetErrorMessage } from '../actions';
import $ from 'jquery';

class JoinPage extends Component {
  
  constructor(props) {
    super(props);    
    this.state = {
      submitDisabled: false
    };
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDismissClick(e) {
    e.preventDefault();
    this.setState({ errorMessage: undefined });
  }

  handleSubmit(data) {

    this.setState({ submitDisabled: true }, () => {

      let validationFailed = '';

      // custom validate for pre-html5 browsers
      ['email',
       'password',
       'fullName',
       'organization',
       'title',
       'interest'].forEach((field) => {
          if ( ! data[field] || data[field].trim().length === 0) {
            validationFailed += (validationFailed.length) ? `\n${field} is required` : `${field} is required`;
          }
        });

      if (validationFailed.length) return this.setState({ submitDisabled: false, errorMessage: validationFailed });
      
      $.ajax({
        type: 'POST',
        url: '/api/join',
        data: data
      })
      .done(((res) => {
        if (res.errorMessage) {
          this.setState({
            submitDisabled: false,
            errorMessage: res.errorMessage || 'Unable to create user.',
          }, this.renderErrorMessage);
        } else {
          window.location = '/home';
        }
      }).bind(this))
      .fail(function(res) {
        this.setState({
          submitDisabled: false,
          errorMessage: res.errorMessage || 'Unable to create user. Please check your input and try again.',
        }, this.renderErrorMessage);
      }.bind(this));

    });

  }

  renderErrorMessage() {
    
    const { errorMessage } = this.state;
   
    if ( ! errorMessage) {
      return null
    };

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage.split('\n').map((message) => { return <div>{ message }</div> })}</b>
        {' '}
        (<a href="#" onClick={this.handleDismissClick}>Dismiss</a>)
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Header />
        <main>
          <div className="container">
            <JoinForm onSubmit={this.handleSubmit} submitDisabled={this.state.submitDisabled} />
            {this.renderErrorMessage()}
            <LegalInfo />
          </div>
        </main>
        <Footer />
        <hr />
        {children}
      </div>
    )
  }

};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(JoinPage)