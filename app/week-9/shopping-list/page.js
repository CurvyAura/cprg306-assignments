"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useUserAuth } from "../../../contexts/AuthContext";

export default function Page() {
    const [items, setItems] = useState(itemsData || []);
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user } = useUserAuth() || {};
    const router = useRouter();

    useEffect(() => {
        // If no authenticated user, redirect to landing page
        if (user === null) {
            router.replace("/week-9");
        }
    }, [user, router]);

    const handleAddItem = (newItem) => {
        setItems((prev) => [newItem, ...prev]);
    };

    const handleItemSelect = (item) => {
        if (!item || !item.name) {
            setSelectedItemName("");
            return;
        }
        let namePart = item.name.split(",")[0] || item.name;

    namePart = namePart.replace(/[^A-Za-zÀ-ž\s]/g, "");
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
                <div className="md:w-80 w-full">
                    <div className="md:sticky md:top-4">
                        <MealIdeas ingredient={selectedItemName} />
                    </div>
                </div>
            </div>
        </main>
    );
}
