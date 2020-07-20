import React, { Component, useState, useEffect } from "react";

// * This component holds the card. right now a bunch of stuff has been taken out for testing purposes, but when all of the 
//components of the recipe are integrated into the Recipe model,
// this component can be changed back to exactly how it is in nutrify main. Literally just copy and paste the code over. 


const RecipeCard = (props) => {

  console.log("PROPS.RECIPE:  ", props.recipe)
  const [recipe, setRecipe] = useState([])

  async function getData() {
    let recipe = await fetch('http://localhost:3000/user/getrecipe', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        id: props.recipe, // this will have to change when we move this function to the App component
      })
    }
    )

    let recipeJSON = await recipe.json()
    setRecipe(recipeJSON)
  }


  useEffect(() => { getData() }, [])
  useEffect(() => {
    props.addEvents();
  })

  console.log('RECIPE CARD RECIPE VALUE: ', recipe)


  if (recipe.length < 1) {
    return null
  } else {
    return (
      <div className="grid-card">
        <img
          src={recipe.recipe[0].img}
          className="card-img"
          alt="the finished product"
        />
        <span className="recipe-title">{recipe.recipe[0].label}</span>
        <div className="card-content">
          <span className="show-details show-details-open ingredient-card-tag">
            Show
    </span>

          <div className="card-content-closed">
            <ul style={{ display: "none" }}>
              {recipe.recipe[0].ingredientLines.map((ingredientLine) => {
                return <li>{ingredientLine}</li>;
              })}
            </ul>
            <h4 style={{ display: "none" }}>A lovely heading</h4>
            <p style={{ display: "none" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
      </p>
          </div>
        </div>

        <div className="card-content">
          <span className="show-details show-details-open nutrition-card-tag">
            Show
    </span>

          <div className="card-content-closed">
            <ul style={{ display: "none" }}>
              {recipe.recipe[0].ingredientLines.map((ingredientLine) => {
                return <li>{ingredientLine}</li>;
              })}
            </ul>
            <h4 style={{ display: "none" }}>A lovely heading</h4>
            <p style={{ display: "none" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
      </p>
          </div>

          <div className="recipe-summary-div">
            6 ingredients | Low carb | Low fat | Martha Stewart
    </div>
        </div>
      </div>
    );
  }
};

export default RecipeCard;
