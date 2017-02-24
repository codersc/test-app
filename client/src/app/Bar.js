import React, { Component } from 'react';

class Bar extends Component {
	constructor() {
		super(); 

		this.state = {
			isAttending: false
		};
	}

	handleClick(event) {
		if (event.target.id === "btnAttend") {
			this.props.onCommitToAttend(this.props.data.id);
		} else {
			this.props.onCommitToUnattend(this.props.data.id);
		}
		
		setTimeout(() => {
			if (this.props.isAuthenticated) {
				this.setState({
					isAttending: !this.state.isAttending
				});
			}
		}, 500);
	}

	render() {
		let btnToggleAttend;

		if (this.state.isAttending) {
			btnToggleAttend = 
				<button id="btnUnattend" className="btn btn-primary btn-sm" type="button" onClick={(event) => this.handleClick(event)}>
					<span className="glyphicon glyphicon-chevron-down" aria-hidden="true">&nbsp;</span><span className="badge">{this.props.data.attendees}</span>
				</button>
		} else {
			btnToggleAttend = 
				<button id="btnAttend" className="btn btn-primary btn-sm" type="button" onClick={(event) => this.handleClick(event)}>
					I'm Going <span className="glyphicon glyphicon-chevron-up" aria-hidden="true">&nbsp;</span><span className="badge">{this.props.data.attendees}</span>
				</button>
		}

		return (
			<div className="bar row">
				<div className="bar col-lg-2 col-sm-2 col-xs-4">
					<img src={this.props.data.image_url} alt="bar"/>
					<img id="bar-rating" src={this.props.data.rating_img_url_large} alt="bar"/>
				</div>
				<div className="col-lg-10 col-sm-10 col-xs-8">
					<div className="row">
						<div className="col-lg-12">
							<h4 className="bar-name">{this.props.data.name}</h4>	
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<p className="bar-snippet-text">{this.props.data.snippet_text}</p>
						</div>
						{btnToggleAttend}
					</div>
				</div>
			</div>
		);
	}
}

export default Bar;
