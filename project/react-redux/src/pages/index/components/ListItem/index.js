import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

const ListItem = ({title, id}) => {

	return (

		<Link className='list-item' to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
