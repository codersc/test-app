import React, { Component } from 'react';
import $                    from 'jquery';
import Nav                  from './Nav';
import Header               from './Header';
import Search               from './Search';
import Bars                 from './Bars';
import Footer               from './Footer';

class App extends Component {
	constructor() {
		super();

		this.state = {
			bars: [],
			isAuthenticated: false
		}
	}

	componentDidMount() {
		if (localStorage.hasSearched) {
			this.handleSearch(localStorage.getItem("searchTerm"));
		}
	}

	handleSearch(location) {
		$.ajax(
			{
				type: 'GET',
				url: `api/search/${location}`,
				success: (data) => {
					this.setState({
						bars: data
					});
				}
			}		
		);

		localStorage.setItem("hasSearched", true);
		localStorage.setItem("searchTerm", location);
	}
	
	handleCommitToAttend(id) {
		$.ajax(
			{
				type: 'POST',
				url: `api/commit/attend/${id}`,
				success: (data, textStatus) => {
					console.log('From handleCommitToAttend -- textStatus:', textStatus);

					const bars = JSON.parse(JSON.stringify(this.state.bars));

					for (var i = 0; i < bars.length; i++) {
						if (bars[i]["id"] === data.id) {
							++bars[i]["attendees"];

							break;
						} 
					}

					this.setState({
						bars: bars,
						isAuthenticated: true
					});
				}
			}	
		);
	}
	
	handleCommitToUnattend(id) {
		$.ajax(
			{
				type: 'POST',
				url: `api/commit/unattend/${id}`,
				success: (data) => {
					const bars = JSON.parse(JSON.stringify(this.state.bars));

					for (var i = 0; i < bars.length; i++) {
						if (bars[i]["id"] === data.id) {
							--bars[i]["attendees"];

							console.log('From App comp -- found bar attendees to decrement', bars[i]["attendees"]);

							break;
						} 
					}

					this.setState({
						bars: bars
					});
				}
			}	
		);
	}

	render() {
		return (
				<div className="App">
					<div className="container">
						<Nav />
						<Header />	
						<Search onSearch={(location) => this.handleSearch(location)} />
						<Bars 
							bars={this.state.bars}
							onCommitToAttend={(id) => this.handleCommitToAttend(id)}
							onCommitToUnattend={(id) => this.handleCommitToUnattend(id)} 
							isAuthenticated={this.state.isAuthenticated} />
						<Footer />
					</div>
				</div>
		);
	}

}

export default App;
