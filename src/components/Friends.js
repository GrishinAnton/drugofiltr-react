import React from 'react';
import Friend from 'containers/Friend';

export default class Friends extends React.Component {

    render() {                      
       
        return (
            <div className="filter-body flex flex_jc-sb p">
                <div className="left-column">
                    <p className="filter-body__title">Ваши друзья</p>
                    <div className="friends-wrapper"
                        onDrop={(e) => this.props.drop(e, 'leftColumn')}
                        onDragOver={e => e.preventDefault()}>
                        {this.props.friends.leftColumn &&
                            <Friend 
                                friends={this.props.friends.leftColumn}
                                buttonClick={this.props.buttonClick}
                                dragStart={this.props.dragStart}
                             />}
                    </div>
                </div>
                <div className="right-column">
                    <p className="filter-body__title">Друзья в списке</p>
                    <div className="friends-wrapper"
                        onDrop={(e) => this.props.drop(e, 'rightColumn')}
                        onDragOver={e => e.preventDefault()}>
                        {this.props.friends.rightColumn &&
                            <Friend 
                                friends={this.props.friends.rightColumn}
                                buttonClick={this.props.buttonClick}
                                dragStart={this.props.dragStart}
                            />
                        }                        
                    </div>
                </div>
            </div>
        )
    }

    

}