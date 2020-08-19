import React, { useState } from 'react';
import './StudentMainPage.css';
import { Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import DropDown from './DropDown';
const StudentMainPage = ({ data, tag }) => {
	const [isHidden, setIsHidden] = useState(true);

	function getAvg(grades) {
		let total = 0,
			integer,
			average;
		for (let i = 0; i < grades.length; i++) {
			integer = Number(grades[i]);
			total += integer;
			if (i + 1 === grades.length) {
				average = total / grades.length;
				break;
			}
		}
		return average;
	}
	// console.log(data);
	return (
		<div className='student-main-page '>
			<Row className='student-img-row'>
				<Col className='student-icon col-sm-4'>
					<img src={`${data.pic}`} alt='student-icon' />
				</Col>

				<Col className='student-data col-sm-6'>
					<div className='information'>
						<h1 className='header_name'>
							{data.firstName} &nbsp;
							{data.lastName}
						</h1>
						<div className='normal_details'>
							<span> Email:{data.email}</span>
							<span> Company:{data.company}</span>
							<span> Skill:{data.skill}</span>
							<span> Average:{getAvg(data.grades)}</span>
						</div>
					</div>
				</Col>

				<Col className='col-sm-2'>
					<span>
						<Button
							className='expand-btn'
							variant='none'
							style={{ backgroundColor: 'none', textDecoration: 'none' }}
							onClick={() => {
								setIsHidden((isHidden) => !isHidden);
							}}
						>
							<FontAwesomeIcon icon={isHidden ? faPlus : faMinus} />
						</Button>
					</span>
				</Col>
				{isHidden ? null : (
					<Row>
						<DropDown student={data} tag={tag} />
					</Row>
				)}
			</Row>
		</div>
	);
};

export default StudentMainPage;
