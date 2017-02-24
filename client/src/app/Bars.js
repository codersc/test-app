import React, { Component } from 'react';
import Bar                  from './Bar.js';

class Bars extends Component {
	render() {
		let bars;
		
 		if (this.props.bars) {		
			bars = this.props.bars.map((bar, indx) => {
				return (
						<Bar 
							key={indx} 
							data={bar}
							onCommitToAttend={this.props.onCommitToAttend}
							onCommitToUnattend={this.props.onCommitToUnattend}
							isAuthenticated={this.props.isAuthenticated} />
				);
			});
		}

		return (
			<div>
			{bars}	
			</div>
		);
	}
}

export default Bars; 
