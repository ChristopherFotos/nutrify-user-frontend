import React, { useEffect, useState } from "react";
import RecipeCard from "./recipeCard";

// This component renders a container for the recipe cards that are returned when the user enters a search term. It accepts an array
// of recipe objects as its props, and it uses that array to render recipe card components. When this component rerenders, the useEffect
// hook adds event listeners to the cards so that they can be opened and closed on click.

const CardContainer = (props) => {
  const [fullRecipes, setfullRecipes] = useState([])

  useEffect(() => {
    console.log('PROPS IN CARDCONTAINER', props)
  })

  function addEvents() {

    let targets = document.querySelectorAll(".show-details");
    console.log("TARGETS EL: ", targets)

    targets.forEach((elem) => {
      console.log('adding event listeners')
      if (elem.hasEventListener) {
        return
      }
      else {
        elem.hasEventListener = true;
        elem.addEventListener("click", (e) => {
          console.log("OPEN EVENT FIRING")
          if (!e.target.expanded) {
            //Checks if the div is collpased and opens it
            e.target.expanded = true;
            e.target.innerText = "Hide";
            Array.from(e.target.parentElement.children[1].children).forEach(
              (li) => {
                li.style.display = "block";
              }
            );
            e.target.parentElement.children[1].classList.remove(
              "card-content-closed"
            );
            e.target.parentElement.children[1].classList.add("card-content-open");
            e.target.parentElement.classList.remove("card-closed");
            e.target.parentElement.classList.add("card-open");
          } else if (e.target.expanded) {
            console.log("CLOSE EVENT FIRING")
            //Checks if the div is open and collapses it
            e.target.expanded = false;
            e.target.innerText = "Show";
            Array.from(e.target.parentElement.children[1].children).forEach(
              (li) => {
                li.style.display = "none";
              }
            );
            e.target.parentElement.children[1].classList.remove(
              "card-content-open"
            );
            e.target.parentElement.children[1].classList.add(
              "card-content-closed"
            );
            e.target.parentElement.children[1].classList.remove("card-open");
            e.target.parentElement.classList.remove("card-open");
            e.target.parentElement.classList.add("card-closed");
          }
        })
      };
    });
  }


  if (props.recipes.length > 0) {
    return (
      <div className="card-container">
        <h3 className="dashboard-heading">Saved recipes</h3>
        {props.recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} addEvents={addEvents}></RecipeCard>;
        })}
      </div>
    );
  } else {
    return (
      <div className="card-container">
        <h4 className="dashboard-heading">Hungry? Save recipes and find them here later! </h4>
        <p id="how-to-p">Go to the home page and search for a recipe by name or ingredients. Click 'Save' when you find one you like, then you can come back here and find it later. </p>
      </div>
    )
  }
};

export default CardContainer;
