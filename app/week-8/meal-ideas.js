"use client";

import { useEffect, useState } from "react";

// Fetch meal ideas from TheMealDB API for the selecte ingredient
export async function fetchMealIdeas(ingredient) {
  if (!ingredient) return [];

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;

  const res = await fetch(url);
  const data = await res.json();
  return data.meals || [];
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const result = await fetchMealIdeas(ingredient);
      if (!cancelled) setMeals(result);
    }

    if (ingredient) {
      load();
    } else {
      setMeals([]);
    }

    return () => {
      cancelled = true;
    };
  }, [ingredient]);

  return (
    <div className="border border-gray-500 p-4 mb-4 bg-gray-900 text-white">
      <h3 className="text-lg font-semibold mb-3">
        Meal suggestions{ingredient ? ` for ${ingredient}` : ""}
      </h3>

      {meals.length === 0 ? (
        <p className="text-sm text-gray-400">No meal suggestions found.</p>
      ) : (
        <ul>
          {meals.map((m) => (
            <li
              key={m.idMeal}
              className="border border-gray-500 p-3 mb-2 bg-gray-900 text-white"
            >
              <div className="text-sm font-medium">{m.strMeal}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

