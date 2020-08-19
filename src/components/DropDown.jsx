import React, { Component } from 'react';
import './DropDown.css';
import { Button } from 'reactstrap';

class DropDown extends Component {
	state = {
		tag: [],
		active: false,
		tagvalue: '',
	};

	// handleChange = ({ currentTarget: input }) => {
	// 	const { tag, active, tagvalue } = this.state;
	// 	// console.log(input.value);
	// 	let result = input.value;

	// 	console.log(tag);
	// 	if (active) {
	// 	}
	// };
	// onKeyPress = (e) => {
	// 	let array = [];
	// 	if (e.key === 'Enter') {
	// 		array.push(result);
	// 		this.state({ tag: array });
	// 	}
	// };

	render() {
		console.log(this.state.active);
		console.log(this.state.tag);
		const { student } = this.props;
		const { tag, active, tagvalue } = this.state;
		return (
			<div className='dropdown_data'>
				<div className='percentage_details'>
					{student.grades.map((data, index) => {
						return (
							<span key={index} style={{ display: 'block' }}>
								{`Test ${index + 1} \u00A0
							${data}%`}
							</span>
						);
					})}

					{active &&
						tag &&
						tag.map(() => {
							return (
								<div className='add-button'>
									<Button className='add-tag-input'>new tag</Button>
								</div>
							);
						})}

					<div className='tag-input-field'>
						<input
							type='text'
							className='form-control'
							// value='Add a Tag'
							placeholder='Add a Tag'
							id='tag-input'
							onChange={this.handleChange}
							//onKeyPress={(e) => onKeyPress(e)}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default DropDown;
