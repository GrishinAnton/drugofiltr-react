import React, { Component } from 'react';
import Button from 'container/Button';
import Friends from 'components/Friends';
import Filters from 'components/Filters';
import isMatch from 'helpers/isMatch'
import 'css/style.css';

const VK = window.VK
class App extends Component {

  state = {
    friends: null
  }

  componentDidMount() {

    (async () => {
      await this.auth()
      const friends = await this.getUsers({ fields: 'photo_100', count: 20 });

      this.setState({
        friends: friends
      })
    })();
  }  

  render() {

    return (
      <div className="container-wrapper">
        <div className="filter-header flex flex_jc-sb flex_a-c p">
          <p className="filter-header__title">Выберите друзей</p>
          <button className="filter-header__close button-reset"></button>
        </div>
        <Filters onChange={this.handlerFilterChange}/>
        {this.state.friends &&
          <Friends friends={this.state.friends} />}
        <Button />
    </div>
    );    
  }

  handlerFilterChange = ev => {
    
    this.state.friends.items.forEach(item=>{
      if (isMatch(`${item.first_name} ${item.last_name}`, ev.target.value)) {
        item.className = 'active'
      }
    })
    console.log(this.state.friends.items);
    
  }

  auth() {
    return new Promise((resolve, reject) => {

      VK.init({
        apiId: 6487256
      });
      VK.Auth.login(data => {
        if (data.session) {
          resolve();
        } else {
          reject(new Error('Не шмогла'));
        }
      }, 2);
    });
  }

  callAPI(method, params) {
    params.v = '5.76';

    return new Promise((resolve, reject) => {
      VK.api(method, params, (data) => {
        if (data.error) {
          reject(data.error);
        } else {
          resolve(data.response);
        }
      });
    });
  }

  getUsers(params) {
    return this.callAPI('friends.get', params)
  }
}

export default App;
