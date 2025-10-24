"use client";

import { useState } from 'react';

export default function NewItem({ onAddItem }) {
    
    // 
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    const increment = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity < 20) {
                return prevQuantity + 1; //increment unless at max
            }
            return prevQuantity;
        });
    };

    const decrement = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                return prevQuantity - 1; //decrement unless at min
            }
            return prevQuantity;
        });
    };

    // prevent default, call onAddItem, and reset
    const handleSubmit = (e) => {
        e.preventDefault();
        const item = { id: Math.random().toString(36).slice(2), name, quantity, category };
        console.log('New item submitted:', item);

        onAddItem(item);
        setName("");
        setQuantity(1);
        setCategory("produce");
    };

    return (
        <form onSubmit={handleSubmit} className="border border-gray-500 p-4 mb-4 bg-gray-900 text-white max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Item</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Quantity</label>

                <div className="flex items-center space-x-4">
                    <button 
                        type="button"
                        onClick={decrement} 
                        disabled={quantity === 1}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                    >-</button>
                    
                    <span className="text-xl font-semibold px-4 py-2 bg-gray-800 border border-gray-600 rounded min-w-12 text-center">
                        {quantity}
                    </span>
                    
                    <button 
                        type="button"
                        onClick={increment} 
                        disabled={quantity === 20}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                    >+</button>
                </div>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                    <option value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="bakery">Bakery</option>
                    <option value="meat">Meat</option>
                    <option value="frozen">Frozen Foods</option>
                    <option value="canned goods">Canned Goods</option>
                    <option value="dry goods">Dry Goods</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="household">Household</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Item
                </button>
            </div>
        </form>
    );
}