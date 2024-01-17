import { useState } from 'react';
import '../style.css';
import Header from './Header';
import Form from './Form';
import PackingList from './PackingList';
import  Footer  from './Footer';

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

export default App;
