"use client";

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";

export default function Page() {
    const [items, setItems] = useState(itemsData || []);
    const [selectedItemName, setSelectedItemName] = useState("");

    const handleAddItem = (newItem) => {
        setItems((prev) => [newItem, ...prev]);
    };

    // When an item is selected we extract its name and store it in state
    const handleItemSelect = (item) => {
        if (!item || !item.name) {
            setSelectedItemName("");
            return;
        }

        // Taking text before any comma to remove quantities/descriptions
        let namePart = item.name.split(",")[0] || item.name;

        // Removing emojis and non-letter characters whilst keeping the letters and spaces
        namePart = namePart.replace(/[^\p{L}\s]/gu, "");

        // Collapsing whitespace and trim
        const cleaned = namePart.replace(/\s+/g, " ").trim();

        setSelectedItemName(cleaned);
    };

    return (
        <main className="bg-black min-h-screen p-4">
            <h1 className="text-white text-2xl font-bold mb-4">Shopping List</h1>
            <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                    <div className="w-full">
                        <NewItem onAddItem={handleAddItem} />
                    </div>

                    <ItemList items={items} onItemSelect={handleItemSelect} />
                </div>

                {/* Right column becomes full-width on small screens and a fixed sidebar on md+ */}
                <div className="md:w-80 w-full">
                    {/* Make the sidebar sticky on larger screens so suggestions stay visible */}
                    <div className="md:sticky md:top-4">
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                </div>
            </div>
        </main>
    );
}