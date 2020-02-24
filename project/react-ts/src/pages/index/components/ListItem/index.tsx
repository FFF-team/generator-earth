import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'

type IProps = {
	title: string,
	id: string
}

const ListItem: React.SFC<IProps> = ({title, id}) => {

	return (

		<Link className='list-item' to={`/site/${id}?ts=123`}>{title}</Link>

	)

};

export default ListItem;
