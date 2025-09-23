export default function Item({name, quantity, category}) {
    return (
        <div className="border border-gray-500 p-3 mb-2 bg-gray-900 text-white">
            <div className="text-lg">{name}</div>
            <div className="text-sm">Quantity: {quantity}</div>
            <div className="text-sm">Category: {category}</div>
        </div>
    )
}
