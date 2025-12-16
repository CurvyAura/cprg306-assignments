"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import { getItems, addItem } from "../_services/shopping-list-service";
import { useUserAuth } from "../../../contexts/AuthContext";

export default function Page() {
    const [items, setItems] = useState([]);
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user } = useUserAuth() || {};
    const router = useRouter();

    useEffect(() => {
        // If no authenticated user, redirect to landing page
        if (user === null) {
            router.replace("/week-10");
        }
    }, [user, router]);

    const handleAddItem = async (newItem) => {
        if (!user) return;
        const newId = await addItem(user.uid, newItem);
        const newItemWithId = { id: newId, ...newItem };
        setItems((prev) => [newItemWithId, ...prev]);
    };

    const handleItemSelect = (item) => {
        try {
            if (!item || !item.name) {
                setSelectedItemName("");
                return;
            }
            let namePart = item.name.split(",")[0] || item.name;

            namePart = namePart.replace(/[^A-Za-zÀ-ž\s]/g, "");
            const cleaned = namePart.replace(/\s+/g, " ").trim();

            setSelectedItemName(cleaned);
        } catch (err) {
            console.error("week-10 handleItemSelect error:", err);
            setSelectedItemName("");
        }
    };

    // Load items for user from Firestore and set component state
    const loadItems = useCallback(async () => {
        if (!user) return;
        const itemsFromDb = await getItems(user.uid);
        setItems(itemsFromDb);
    }, [user]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

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
