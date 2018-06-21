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
			leftColumn: [],
			rightColumn: []
		},
		leftFilter: '',
		rightFilter: ''
	}

	// componentWillReceiveProps(){
	// 	console.log('willReceive');
	// }

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(snapshot);
	}
	getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log(prevProps, 'getSnapshot');
		console.log(prevState, 'getSnapshot2');
		
		let a = prevState.filters
		return a
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
				<Filters value={this.state} onChange={this.handlerFilterChange}/>
				{(this.state.friends.leftColumn || this.state.friends.rightColumn) &&
					<Friends 
						friends={this.state.friends}
						buttonClick={this.handlerOnButtonClick}
				/>}
				<Button />
			</div>
		);    
	}

	handlerFilterChange = ev => {

		var side = ev.target.name		
		
		// let side = this.state[ev.target.name]
		// console.log(this.state[ev.target.name], 'side');
		// console.log(ev.target.value, 'sideValue');
		
		side = ev.target.value
		this.setState({ side })	
		console.log(this.state);
		

		
		// this.filterSort()
	}

	filterSort = () => {		

		if (this.state.filters.left || this.state.filters.right) {

			let stateLeft = this.state.friends.leftColumn.map(item => {
				if (isMatch(`${item.first_name} ${item.last_name}`, this.state.filters.left)) {
					item.className = ''
					return item
				} else {
					item.className = 'none'
					return item
				}
			});

			var sideLeft = stateLeft
			this.setState({ sideLeft })

			let stateRight = this.state.friends.rightColumn.map(item => {
				if (isMatch(`${item.first_name} ${item.last_name}`, this.state.filters.right)) {
					item.className = ''
					return item
				} else {
					item.className = 'none'
					return item
				}
			});

			var sideRight = stateRight
			this.setState({ sideRight })
		} else {
			let stateLeft = this.state.friends.leftColumn.map(item => {
				item.className = ''
				return item
			});

			var sideLeft = stateLeft
			this.setState({ sideLeft })

			let stateRight = this.state.friends.rightColumn.map(item => {
				item.className = ''
				return item
			});

			var sideRight = stateRight
			this.setState({ sideRight })
		}

	}

	handlerOnButtonClick = ev => {

		var id = ev.nativeEvent.srcElement.parentElement.parentElement.dataset.id
		var column = ev.nativeEvent.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.className
		
		var side = column === 'left-column' ? this.state.friends.leftColumn : this.state.friends.rightColumn;
		var siblingSide = column === 'left-column' ? this.state.friends.rightColumn : this.state.friends.leftColumn;

		for(let i in side ){
			if( side[i].id === +id){
				let friends = { ...this.state.friends }

				siblingSide.push(side[i])
				this.setState({ friends })
				side.splice(i, 1);				
			}
			
		}
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
