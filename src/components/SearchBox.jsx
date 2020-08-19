import React from 'react';

const SearchBox = ({ value, onChange, placeholder }) => {
	return (
		<input
			style={{
				border: 'none',
				borderRadius: '0px',
				borderBottom: '1px solid grey',
				backgroundColor: 'white',
				marginBottom: '5px',
				marginTop: '5px',
			}}
			type='text'
			name='query'
			id='name-input'
			className='form-control'
			placeholder={placeholder}
			value={value}
			onChange={(e) => onChange(e.currentTarget.value)}
		/>
	);
};

export default SearchBox;
