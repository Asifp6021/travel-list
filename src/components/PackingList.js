import { useState } from 'react';
import Item  from './Item';

export default function PackingList({ items, onDelete, onToggle, onClear }) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;

	if (sortBy === 'desc')
		sortedItems = items.slice().sort((a, b) => a.desc.localeCompare(b.desc));

	if (sortBy === 'packed')
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="packing">
			<ul className="packing-data">
				{sortedItems.map((item) => (
					<Item
						item={item}
						onDelete={onDelete}
						key={item.id}
						onToggle={onToggle}
					/>
				))}
			</ul>
			<div className="features">
				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">short by the input</option>
					<option value="desc">short by the desctiption</option>
					<option value="packed">short by the packed</option>
				</select>

				<button onClick={onClear}>clear list</button>
			</div>
		</div>
	);
}
