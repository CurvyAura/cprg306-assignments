export default function Item({ name, quantity, category, onSelect }) {
    const handleKeyDown = (e) => {
        if (!onSelect) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
        }
    };

    return (
        <li
            role="button"
            tabIndex={0}
            onClick={() => onSelect && onSelect()}
            onKeyDown={handleKeyDown}
            className="border border-gray-500 p-3 mb-2 bg-gray-900 text-white"
        >
            <div className="text-lg">{name}</div>
            <div className="text-sm">Quantity: {quantity}</div>
            <div className="text-sm">Category: {category}</div>
        </li>
    );
}
