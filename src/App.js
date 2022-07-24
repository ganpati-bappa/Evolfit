import React from "react";

import User from './Components/User'

import './SCSS/HomePage.scss'


import { FaWalking } from 'react-icons/fa'
import { BiDumbbell } from 'react-icons/bi'

import { MdFastfood } from 'react-icons/md'

function App() {

  const users = [{
    id : "0",
    Name : "Charvie Sharma",
    Email : "charviesharma@gmail.com",
    steps : 526,
    steps_target : 4000,
    calories : 3200,
    calories_target : 2500,
    protien : 23,
    fats : 45,
    carbs : 35,
    performed_date : new Date("2022-10-15"),
    scheduled_date : new Date("2022-07-24"),
    feedback : true
    
  }, {
    id : "1",
    Name : "Charvie Sharma",
    Email : "charviesharma@gmail.com",
    steps : 2526,
    steps_target : 4000,
    calories : 3400,
    calories_target : 4500,
    protien : 43,
    fats : 35,
    carbs : 20,
    performed_date : new Date("2021-01-10"),
    scheduled_date : new Date("2022-07-26"),
    feedback : false
  }, {
    id : "2",
    Name : "Charvie Sharma",
    Email : "charviesharma@gmail.com",
    steps : 3526,
    steps_target : 4000,
    calories : 1200,
    calories_target : 2500,
    protien : 53,
    fats : 55,
    carbs : 5,
    performed_date : new Date("2022-10-15"),
    scheduled_date : new Date("2022-10-27"),
    feedback : false
  }]



  return (
    <div className = "HomePage">

      <div className = "user_profile_info">
        <div className = "user_profile_headings">
          <span></span>
          <span className = "user_profile_heading"> 
              < FaWalking />
              <span> Steps </span>
          </span>
          <span className = "user_profile_heading"> 
              < BiDumbbell />
              <span> Workout </span>
          </span>

          <span className = "user_profile_heading"> 
              < MdFastfood />
              <span> Nutrition </span>
          </span>
          <span></span>
        </div>
        {users.map((user) => {
          return (
            <div className = "users_profile" key = { user.id }>
            <User user = { user }/>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
