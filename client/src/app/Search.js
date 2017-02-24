import React, { Component } from 'react';

class Search extends Component {
	handleClick() {
		let term = this.refs.searchBar.value;

		this.props.onSearch(term);
	}

	render() {
		return (
			<div className="row search-bar">
				<div className="col-lg-8 col-lg-offset-2">
					<div className="input-group">
						<input ref="searchBar" type="text" className="form-control" placeholder="Search for bars in your city..."/>
						<span className="input-group-btn">
							<button className="btn btn-default" type="button" onClick={() => this.handleClick()}>Go!</button>
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Search;
