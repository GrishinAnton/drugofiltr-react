import React, { Component } from 'react';
import Button from 'container/Button';
import Friends from 'components/Friends';
import Filters from 'components/Filters';
import isMatch from 'helpers/isMatch'
import 'css/style.css';

const VK = window.VK
class App extends Component {

	state = {
		friends: {
			leftColumn: null,
			rightColumn: null
		}
	}

	componentDidMount() {

		(async () => {
			await this.auth()
			const friendsArr = await this.getUsers({ fields: 'photo_100', count: 20 });
			
			let friends = { ...this.state.friends }			
			friends.leftColumn = friendsArr.items
			this.setState({ friends })		
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
				{this.state.friends.leftColumn &&
					<Friends 
						friends={this.state.friends}
						buttonClick={this.handlerOnButtonClick}
				/>}
				<Button />
			</div>
		);    
	}

	handlerFilterChange = ev => {

		if (ev.target.value) {
			let state = this.state.friends.leftColumn.map(item => {
				if (isMatch(`${item.first_name} ${item.last_name}`, ev.target.value)) {
					item.className = ''
					return item
				} else {
					item.className = 'none'
					return item
				}
			});  

			let friends = { ...this.state.friends }			
			friends.leftColumn = state
			this.setState({ friends })	
		} else {
			let state = this.state.friends.leftColumn.map(item => {
					item.className = ''
					return item
			}); 

			let friends = { ...this.state.friends }			
			friends.leftColumn = state
			this.setState({ friends })	
		}
	}

	handlerOnButtonClick = ev => {
		console.log(ev.nativeEvent.srcElement.parentElement.parentElement.dataset.id);		
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
