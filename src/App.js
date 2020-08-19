import React, { Component } from 'react';
import { Container, Row, Card } from 'reactstrap';
import axios from 'axios';
import './App.css';
import StudentMainPage from './components/StudentMainPage';
import SearchBox from './components/SearchBox';

const apiEndpoint = 'https://www.hatchways.io/api/assessment/students';
class App extends Component {
	state = { students: null, searchQuery: '', tag: [] };
	getDataFromAPI = async () => {
		const {
			data: { students },
		} = await axios.get(apiEndpoint);
		return students;
	};
	componentDidMount = async () => {
		if (this.state.registrationData != null) return;
		let students = await this.getDataFromAPI();
		if (students === null) return;
		this.setState({ students: students });
	};

	getSearchData = () => {
		const { searchQuery, students } = this.state;
		let filtered = students;

		if (searchQuery) {
			filtered = Object.values(filtered).filter((student) =>
				student.firstName.toLowerCase().startsWith(searchQuery.toLowerCase()),
			);
		} else return filtered;
		//console.log(filtered);
		return filtered;
	};
	handleSearch = (query) => {
		this.setState({ searchQuery: query });
		this.getSearchData();
		//this.setState({ students: students });
	};

	render() {
		const students = this.getSearchData();
		//console.log(typeof students);
		if (students == null) return <h1>Loading</h1>;
		return (
			<Card className='main_content'>
				<div className='search_box_group'>
					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
						placeholder='Search by name'
					/>
					<SearchBox
						value={this.state.searchQuery}
						onChange={this.handleSearch}
						placeholder='Search by Tag'
					/>
				</div>
				<div className='content'>
					{students.map((student) => {
						return (
							<StudentMainPage
								key={student.id}
								data={student}
								tag={this.state.tag}
							/>
						);
					})}
				</div>
			</Card>
		);
	}
}

export default App;
