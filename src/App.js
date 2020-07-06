import React, { Component, useState, useEffect } from "react";
import "./materialize.css";
import CardContainer from "./cardContainer";


const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [fullRecipes, setfullRecipes] = useState([]);

  let recipesToRender = "INITIAL VALUE";
  console.log("initial value: ", recipesToRender)

  // The following useEffect hook sends a fetch request to the 
  //'verify' route with localStorage.token as the authorization header.
  // if the user is not logged in then localStorage.token will have 
  // no value, and verification will fail. In this event, the user 
  // is redirected to the login page.

  useEffect((() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3000/user/verify', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer ' + localStorage.token
        }
      }
      )

      const JSONresponse = await res.json()
      console.log("JSONresponse :", JSONresponse)

      if (JSONresponse.message === "Authentication failed") {
        console.log(JSONresponse)
        console.log("Auth failed")
        // window.location.replace('http://localhost:3000/login')
      } else {
        const requestedRecipes = await fetch('http://localhost:3000/user/recipes', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
          },
        }
        )

        let recipesJSON = await requestedRecipes.json();
        setRecipes(recipesJSON.recipes)
        console.log("recipes state: ", recipes)
      }
    }

    fetchData()
  }
  ), [])

  console.log("Outside of UE callback:", recipes, " ", fullRecipes)


  return (
    <React.Fragment>
      <div className="app-container">
        <CardContainer recipes={recipes}></CardContainer>
      </div>
    </React.Fragment>
  );
};

export default App;
