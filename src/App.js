import { useState } from 'react';
import './style.css';

function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItems(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) => {
				return item.id === id ? { ...item, packed: !item.packed } : item;
			})
		);
	}

	function handleClear() {
		const confirmed = window.confirm(
			'Are you sure you want to delete all items?'
		);

		if (confirmed) setItems([]);
	}

	return (
		<div className="main-contaner">
			<Header />
			<Form onAddItems={handleAddItems} />
			<PackingList
				items={items}
				onDelete={handleDeleteItems}
				onToggle={handleToggleItem}
				onClear={handleClear}
			/>
			<Footer />
		</div>
	);
}

function Header() {
	return (
		<div className="header">
			<h1>🏝️ Far Away 🧳 </h1>
		</div>
	);
}

function Form({ onAddItems }) {
	const [quantity, setQuantity] = useState(1);
	const [desc, setDesc] = useState('');

	function handleSubmit(e) {
		e.preventDefault();

		if (!desc) return;

		const newItem = {
			desc,
			quantity,
			packed: false,
			id: Date.now(),
		};

		onAddItems(newItem);
		console.log(newItem);
	}

	return (
		<div className="question">
			<p className="question-para">What do you need for your 😍 trip?</p>

			<form
				className="form"
				onSubmit={handleSubmit}>
				<select
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}>
					{Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
						<option
							value={num}
							key={num}>
							{num}
						</option>
					))}
				</select>

				<input
					placeholder="item..."
					type="text"
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				/>

				<button className="form-btn">Add</button>
			</form>
		</div>
	);
}

function PackingList({ items, onDelete, onToggle, onClear }) {
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

function Item({ item, onDelete, onToggle }) {
	return (
		<li className="list">
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggle(item.id)}
			/>
			<p className={item.packed ? 'line-through' : 'data'}>
				{item.quantity} {item.desc}
			</p>

			<p
				className="delete"
				onClick={() => onDelete(item.id)}>
				X
			</p>
		</li>
	);
}

function Footer() {
	return (
		<div className="footer">
			<p>Start adding some items to your packing list</p>;
		</div>
	);
}

export default App;
