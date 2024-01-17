export default function Item({ item, onDelete, onToggle }) {
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
