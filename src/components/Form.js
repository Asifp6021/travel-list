import { useState } from 'react';

export default function Form({ onAddItems }) {
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
