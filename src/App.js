import React, { Component } from 'react';
import 'css/style.css';

class App extends Component {
  render() {
    return (
      <div className="container-wrapper">
        <div className="filter-header flex flex_jc-sb flex_a-c p">
          <p className="filter-header__title">Выберите друзей</p>
          <button className="filter-header__close button-reset"></button>
        </div>
        <div className="filer-search flex flex_jc-sb flex_a-c p">
          <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" />
          <input className="input-friends-save" type="text" placeholder="Название" />
        </div>
        <div className="filter-body flex flex_jc-sb p">
          <div className="left-column">
            <p className="filter-body__title">Ваши друзья</p>
            <div className="friends-wrapper"></div>
          </div>
          <div className="right-column">
            <p className="filter-body__title">Друзья в списке</p>
            <div className="friends-wrapper"></div>
          </div>
        </div>
        <div className="filter-footer p flex flex_a-c">
          <button className="button-save js-button">Сохранить</button>
        </div>
    </div>
    );
  }
}

export default App;
