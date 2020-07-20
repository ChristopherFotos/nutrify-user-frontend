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
        },
        credentials: 'include'
      }
      )

      const JSONresponse = await res.json()
      console.log("JSONresponse :", JSONresponse)

      if (JSONresponse.message === "Authentication failed") {
        console.log(JSONresponse)
        console.log("Auth failed")
        window.location.replace('http://localhost:5000/')
      } else {
        const requestedRecipes = await fetch('http://localhost:3000/user/recipes', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
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

  const logout = async () => {
    let res = await fetch('http://localhost:3000/user/logout',
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }
    )
    console.log(res)
    if (res.status === 200) {
      window.location.replace('http://localhost:5000')
    }
  }

  return (
    <React.Fragment>
      <div className="app-container">
        <div className="navbar">
          <div className="navbar-button-container" id='guest-navbar'>
            <a href="http://localhost:5000/" className="navbar-button" id="dashboard-button">home</a>
            <span className="navbar-button" id="login-button" onClick={logout}>logout</span>
          </div>
        </div>
        <CardContainer recipes={recipes}></CardContainer>
      </div>
    </React.Fragment>
  );
};

export default App;
