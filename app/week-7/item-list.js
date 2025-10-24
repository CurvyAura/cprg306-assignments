"use client";

import { useState, useMemo } from "react";
import Item from "./item";

export default function ItemList({ items = [] }) {
    const [sortBy, setSortBy] = useState("name");

    const sortedItems = useMemo(() => {
        const itemsCopy = [...items];
        if (sortBy === "quantity") return itemsCopy.sort((left, right) => left.quantity - right.quantity);
        return itemsCopy.sort((left, right) => left[sortBy].localeCompare(right[sortBy]));
    }, [items, sortBy]);
    
    return (
        <div>
            <div className="mb-4 flex space-x-2">
                <button
                    type="button"
                    onClick={() => setSortBy("name")}
                    className={`py-1 px-3 rounded ${sortBy === "name" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
                >Sort by Name</button>

                <button
                    type="button"
                    onClick={() => setSortBy("category")}
                    className={`py-1 px-3 rounded ${sortBy === "category" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
                >Sort by Category</button>
            </div>

            <ul>
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        name={item.name}
                        quantity={item.quantity}
                        category={item.category}
                    />
                ))}
            </ul>
        </div>
    );
}