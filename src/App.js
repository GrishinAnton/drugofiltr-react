import React, { Component } from 'react';
import Button from 'container/Button';
import Friends from 'components/Friends';
import Filters from 'components/Filters'
import 'css/style.css';

class App extends Component {
  render() {

    return (
      <div className="container-wrapper">
        <div className="filter-header flex flex_jc-sb flex_a-c p">
          <p className="filter-header__title">Выберите друзей</p>
          <button className="filter-header__close button-reset"></button>
        </div>
        <Filters />
        <Friends />
        <Button />
    </div>
    );    
  }
}

export default App;
