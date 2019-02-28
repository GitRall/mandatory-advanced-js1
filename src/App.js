import React, { Component } from 'react';
import Login from './Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.state = {page: 'login', userName: ''}
  }
  onChangeUsername(e) {
    this.setState({userName: e.target.value})
    console.log(this.state);
  }
  render() {
    const login = <Login onChangeUsername={this.onChangeUsername}/>
    if(this.state.page === 'login'){
      return (
        <div className="App">
          {login}
        </div>
      );
    }
  }
}


export default App;
