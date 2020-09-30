import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from '../../../hoc/_Aux';
import Breadcrumb from '../../../App/layout/AdminLayout/Breadcrumb';
import Parse from 'parse';
import md5 from 'md5';

class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      message: ''
    };
  }

  componentDidMount() {}

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    Parse.User
      .logIn(username, md5(password))
      .then((x) => {
        this.setState({ loading: false });
        return this.props.history.push('/dashboard/default');
      })
      .catch((err) => {
        console.log(err);
        this.setState({ message: err.message, loading: false });
      });
  };

  render() {
    const { message, loading } = this.state;
    return (
      <Aux>
        <Breadcrumb />
        <div className='auth-wrapper'>
          <div className='auth-content'>
            <div className='auth-bg'>
              <span className='r' />
              <span className='r s' />
              <span className='r s' />
              <span className='r' />
            </div>
            <div className='card'>
              <div className='card-body text-center'>
                <div className='mb-4'>
                  <i className='feather icon-unlock auth-icon' />
                </div>
                <h3 className='mb-4'>Login</h3>
                {message !== '' ? (
                  <p className='mb-4' style={{ color: 'red' }}>
                    {message}
                  </p>
                ) : (
                  ''
                )}
                <form onSubmit={this.handleSubmit}>
                  <div className='input-group mb-3'>
                    <input
                      type='text'
                      required={true}
                      className='form-control'
                      placeholder='Username'
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </div>
                  <div className='input-group mb-4'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </div>
                  {/* <div className='form-group text-left'>
                  <div className='checkbox checkbox-fill d-inline'>
                    <input type='checkbox' name='checkbox-fill-1' id='checkbox-fill-a1' />
                    <label htmlFor='checkbox-fill-a1' className='cr'>
                      {' '}
                      Save credentials
                    </label>
                  </div>
                </div> */}
                  <button className='btn btn-primary shadow-2 mb-4' disabled={loading}>
                    {loading ? 'Checking credential info...' : 'Login'}
                  </button>
                </form>
                {/* <p className='mb-2 text-muted'>
                  Forgot password? <NavLink to='/auth/reset-password-1'>Reset</NavLink>
                </p>
                <p className='mb-0 text-muted'>
                  Don’t have an account? <NavLink to='/auth/signup-1'>Signup</NavLink>
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default SignUp1;
