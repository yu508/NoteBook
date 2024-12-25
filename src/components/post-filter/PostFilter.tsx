import React from 'react';
import MyInput from '../UI/input/MyInput.tsx';
import MySelect from '../UI/select/MySelect.tsx';
import {ArrowUp, ArrowDown} from 'lucide-react';
import "./PostFilter.scss";

const PostFilter = ({filter, setFilter}) => {
	// Функція для зміни напрямку сортування
	const toggleSortDirection = () => {
		setFilter({
			...filter,
			direction: filter.direction === 'asc' ? 'desc' : 'asc',
		});
	};

	return (
			<div className="post-filter">
				<MyInput
						value={filter.query}
						onChange={(e) => setFilter({...filter, query: e.target.value})}
						placeholder="Search..."
				/>
				<MySelect
						value={filter.sort}
						onChange={selectedSort => setFilter({...filter, sort: selectedSort, direction: 'asc'})} // встановлюємо початковий напрямок сортування
						defaultValue="Сортувати"
						option={[
							{ value: "title", name: "За іменем" },
							{ value: "body", name: "За описом" },
							{ value: "date", name: "За датою" },
						]}
				/>
				<button
						style={{ marginLeft: 10 }}
						onClick={toggleSortDirection}
						aria-label="Change sort direction"
				>
					{filter.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}
				</button>
			</div>
	);
};

export default PostFilter;
