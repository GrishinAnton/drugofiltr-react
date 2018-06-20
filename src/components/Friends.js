import React from 'react';
import Friend from 'container/Friend';

export default class Friends extends React.Component {

    render() {      
       
        return (
            <div className="filter-body flex flex_jc-sb p">
                <div className="left-column">
                    <p className="filter-body__title">Ваши друзья</p>
                    <div className="friends-wrapper">
                        {this.props.friends.leftColumn &&
                            <Friend 
                                friends={this.props.friends.leftColumn}
                                buttonClick={this.props.buttonClick}
                             />}
                    </div>
                </div>
                <div className="right-column">
                    <p className="filter-body__title">Друзья в списке</p>
                    <div className="friends-wrapper">
                        {this.props.friends.rightColumn &&
                            <Friend 
                                friends={this.props.friends.rightColumn}
                                buttonClick={this.props.buttonClick} />
                        }                        
                    </div>
                </div>
            </div>
        )
    }

    

}