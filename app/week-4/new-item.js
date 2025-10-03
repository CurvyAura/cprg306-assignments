"use client";

import { useState } from 'react';

export default function NewItem() {
    // setQuantity is the function used to update the quantity value.
    const [quantity, setQuantity] = useState(1);

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

    return (
        <div className="border border-gray-500 p-4 mb-4 bg-gray-900 text-white max-w-md">
            <h2 className="text-xl font-bold mb-4">Counter!</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Quantity</label>

                <div className="flex items-center space-x-4">
                    <button 
                        onClick={decrement} 
                        disabled={quantity === 1}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                    >-</button>
                    
                    <span className="text-xl font-semibold px-4 py-2 bg-gray-800 border border-gray-600 rounded min-w-12 text-center">
                        {quantity}
                    </span>
                    
                    <button 
                        onClick={increment} 
                        disabled={quantity === 20}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded"
                    >+</button>
                </div>
            </div>
        </div>
    );
}