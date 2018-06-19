import React from 'react';

export default class Filters extends React.Component {

    render() {

        return (
            <div className="filer-search flex flex_jc-sb flex_a-c p">
                <input className="input_img input-friends-vk" type="text" placeholder="Начните вводить имя друга" />
                <input className="input-friends-save" type="text" placeholder="Название" />
            </div>
        )
    }
}