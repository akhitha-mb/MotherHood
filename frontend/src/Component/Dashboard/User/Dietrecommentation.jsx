import React, { useState } from 'react';

const Dietrecommentation= () => {
  // State variables
  const [trimester, setTrimester] = useState("First Trimester");
  const [preferences, setPreferences] = useState("");
  const [allergies, setAllergies] = useState("");
  const [recommendations, setRecommendations] = useState("");
  
  // Sample data for demonstration purposes
  const sampleMeals = {
    "Breakfast": [
      {"meal": "Avocado Toast", "nutrients": "Fiber, Healthy Fats, Folate"},
      {"meal": "Oatmeal with Berries", "nutrients": "Iron, Antioxidants, Fiber"},
      {"meal": "Spinach and Feta Omelet", "nutrients": "Protein, Calcium, Iron, Folate"},
      {"meal": "Whole Grain Pancakes with Fruit", "nutrients": "Complex Carbs, Vitamin C, Fiber"}
    ],
    "Lunch": [
      {"meal": "Grilled Chicken Salad", "nutrients": "Protein, Iron, Vitamin C"},
      {"meal": "Quinoa and Veggie Bowl", "nutrients": "Protein, Fiber, Folate"},
      {"meal": "Mediterranean Chickpea Wrap", "nutrients": "Protein, Fiber, Complex Carbs"},
      {"meal": "Tuna Sandwich on Whole Grain", "nutrients": "Omega-3, Protein, B Vitamins"}
    ],
    "Dinner": [
      {"meal": "Salmon with Steamed Veggies", "nutrients": "Omega-3, Vitamin D, Protein"},
      {"meal": "Lentil Soup with Whole-Grain Bread", "nutrients": "Iron, Fiber, Folate"},
      {"meal": "Baked Chicken with Sweet Potatoes", "nutrients": "Protein, Vitamin A, Complex Carbs"},
      {"meal": "Bean and Vegetable Stir Fry", "nutrients": "Protein, Fiber, Vitamin C"}
    ],
    "Snacks": [
      {"meal": "Greek Yogurt with Honey", "nutrients": "Calcium, Protein, Probiotics"},
      {"meal": "Mixed Nuts and Dried Fruits", "nutrients": "Healthy Fats, Iron, Fiber"},
      {"meal": "Hummus with Carrots and Celery", "nutrients": "Protein, Vitamin A, Fiber"},
      {"meal": "Apple with Peanut Butter", "nutrients": "Fiber, Healthy Fats, Vitamin C"}
    ]
  };

  // Function to recommend meals
  const recommendMeals = () => {
    let recommendations = [];
    
    for (const [category, meals] of Object.entries(sampleMeals)) {
      let filteredMeals = meals.filter(meal => 
        (preferences === "" || meal.meal.toLowerCase().includes(preferences.toLowerCase())) &&
        (allergies === "" || !meal.meal.toLowerCase().includes(allergies.toLowerCase()))
      );
      
      // If no meals match preferences/allergies, fallback to default
      if (filteredMeals.length === 0) {
        filteredMeals = meals;
      }
      
      // Select a random meal from filtered options
      const selectedMeal = filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
      recommendations.push(`${category}: ${selectedMeal.meal} (Nutrients: ${selectedMeal.nutrients})`);
    }
    
    setRecommendations(recommendations.join("\n\n"));
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-3">👶 Pregnancy Meal Recommendation System</h1>
          <div className="card mb-4">
            
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label htmlFor="trimester">Select Your Trimester</label>
            <select 
              id="trimester"
              className="form-select"
              value={trimester}
              onChange={(e) => setTrimester(e.target.value)}
            >
              <option value="First Trimester">First Trimester</option>
              <option value="Second Trimester">Second Trimester</option>
              <option value="Third Trimester">Third Trimester</option>
            </select>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label htmlFor="preferences">Food Preferences</label>
            <input
              type="text"
              id="preferences"
              className="form-control"
              placeholder="Enter your food preferences"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
            <small className="form-text text-muted">E.g., Vegan, High Protein, Spicy</small>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="form-group">
            <label htmlFor="allergies">Food Allergies</label>
            <input
              type="text"
              id="allergies"
              className="form-control"
              placeholder="Enter any known allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
            <small className="form-text text-muted">E.g., Nuts, Dairy, Gluten</small>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-center">
          <button 
            className="btn btn-primary btn-lg"
            onClick={recommendMeals}
          >
            Generate Meal Recommendations
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="recommendations">Meal Recommendations</label>
            <textarea
              id="recommendations"
              className="form-control"
              rows="10"
              value={recommendations}
              readOnly
              placeholder="Your recommended meals will appear here"
            />
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Dietrecommentation;