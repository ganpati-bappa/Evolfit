import React, { useEffect, useState } from 'react'

// Styles
import './../SCSS/user.scss'

import Logo from './rose.png'

import Tooltip from "./../Components/Tooltip";

import "@fontsource/montserrat"

import { FiUserCheck } from 'react-icons/fi'
import { TbCalendarTime, TbExclamationMark } from 'react-icons/tb'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { TbBell } from 'react-icons/tb'
import { FaPlus, FaMinus } from 'react-icons/fa'

export const User = (props) => {

    const Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aud", "Sep", "Oct", "Nov", "Dec"]

    // To open Tooltip
    const [hovering, setHovering] = useState(false);

    // To monitor the progress of no of steps
    let [progress , setProgress] = useState(0);
    let [target, setTarget] = useState(parseInt(props.user.steps_target));
    let [progress_value , setProgressValue] = useState(0);

    // To monitor the progress of no of calories intake
    let [calorie_intake, setCalorieIntake] = useState(0);
    let [calorie_target, setCalorieTarget] = useState(parseInt(props.user.calories_target));
    let [protien, setProtien] = useState(0);
    let [fats, setFats] = useState(0);
    let [carbs, setCarbs] = useState(0);

    
    // Steps Progress bar id
    let user_id = `progress_bar${props.user.id}` ;

    // User Profile id
    let user_profile_id = `user${props.user.id}`;

    // Calorie Bar Id
    let calorie_id = `calorie_bar${props.user.id}`

    // Scheduled Date Id
    let Scheduled_id = `scheduled_date${props.user.id}`


    // Handle Steps Increment Operation
    const handle_steps_increase = () => {
        target += 500;
        setTarget(target);
    }

    // Handle Steps Decrement Operation
    const handle_steps_decrease = () => {
        if (target > 500){
            target -= 500;
            setTarget(target);
        }
        else {
            console.log("Target Can not be less than 500")
        }
    }


    // For Filling the data inside the user row of steps taken
    useEffect(() => {
        
        let total_steps = parseInt(props.user.steps);
        let final_progress = (100 * total_steps)/target;

        // progress bar
        let progress_bar = document.getElementById(user_id);

        if (final_progress > progress) {
            const handle_progress = setInterval(() => {
                setProgress(progress++);
                progress_bar.style.backgroundImage = `conic-gradient(
                    #7ed18d ${progress}%,
                    #fff ${progress}%
                )`
                if (progress >= final_progress){
                    clearInterval(handle_progress);
                    if (progress_value != props.user.steps){
                        let c = props.user.steps;
                        setProgressValue(c);    
                    }
                }
                else {
                    if (progress_value != props.user.steps){
                        let c = Math.ceil((progress*target)/100);
                        setProgressValue(c);
                    }
                }
            },20);
        }
        else if (final_progress < progress){
            const handle_progress = setInterval(() => {
                setProgress(progress--);
                progress_bar.style.backgroundImage = `conic-gradient(
                    #7ed18d ${progress}%,
                    #fff ${progress}%
                )`
                if (progress <= final_progress){
                    clearInterval(handle_progress);
                }
            },50);
        }

    }, [ target ])


    // For Filling the data inside the user row of calorie intake
    useEffect(() => {

        // Calorie Bar
        let progress_bar = document.getElementById(calorie_id); 
        let Scheduled_date = document.getElementById(Scheduled_id);
        const date = new Date();
        console.log(date.toLocaleDateString([])  + " ==> " + props.user.scheduled_date);

        if (date.getDate() == props.user.scheduled_date.getDate() &&
         date.getMonth() == props.user.scheduled_date.getMonth() && 
         date.getFullYear() == props.user.scheduled_date.getFullYear()){
            Scheduled_date.style.backgroundColor = "#CC3838";
            Scheduled_date.style.width = "90px";
            Scheduled_date.style.height = "30px";
            Scheduled_date.style.borderRadius = "8px";
        }
        
        const handle_calorie_bar = setInterval(() => {
                let flag = true;
                if (protien < props.user.protien){
                    flag = false;
                    setProtien(protien++);
                }
                if (fats < props.user.fats) {
                    flag = false;
                    setFats(fats++);
                }
                if (carbs < props.user.carbs) {
                    flag = false;
                    setCarbs(carbs++);
                }
                if (calorie_intake < props.user.calories){
                    flag = false;
                    if (calorie_intake + 50 < props.user.calories){
                        calorie_intake += 50;
                        setCalorieIntake(calorie_intake);
                    }
                    else {
                        setCalorieIntake(props.user.calories);
                    }
                }
                if (flag == true)
                    clearInterval(handle_calorie_bar);
                else {
                    let total = parseInt(props.user.protien) + parseInt(props.user.fats) + parseInt(parseInt(props.user.carbs));
                    let percentage_protien = (protien * 100)/total;
                    let percentage_fats = (fats * 100)/total;
                    let percentage_carbs = (carbs * 100)/total;
                    
                    progress_bar.style.backgroundImage = `conic-gradient(
                        #f45c84 ${percentage_protien}%,
                        #05bff1 ${percentage_protien}% ${percentage_protien + percentage_fats}%,
                        #f5c90f ${percentage_protien + percentage_fats}% ${percentage_protien + percentage_fats + percentage_carbs}%,
                        #fff ${percentage_protien + percentage_fats + percentage_carbs}% 100%
                    )`
                }
            }, 50)

    }, [])


    // handling Hovering Effect on Nutrient Bar
    const handle_mouse_over = () => {
        setHovering(true);
    }

    const handle_mouse_leave = () => {
        setHovering(false);
    }

    const handle_calorie_increase = () => {
        calorie_target += 100;
        setCalorieTarget(calorie_target);
    }


    const handle_calorie_decrease = () => {
        if (calorie_target > 100){
            calorie_target -= 100;
            setCalorieTarget(calorie_target);
        }
    }



    return (
        <div className = "user_container" id = {user_profile_id}>
            <div className = "user_info_holder">
                <div className = "user_dp">
                    <img src = {Logo} alt = "user_dp"></img>
                </div>

                <div className = "user_info">
                    <span> {props.user.Name} </span>
                    <span className = "sub_heading"> {props.user.Email} </span>
                </div>
            </div>

            <div className = "user_steps">
                <div className = "user_progress_bar" id = {user_id}>
                    <div className = "user_progress_steps">
                        <span>{progress_value}</span>
                        <span className = 'sub_heading'> Walked </span>
                    </div>
                </div>

                <div className = "user_target_steps">
                    <div className = "user_target_buttons" onClick = {handle_steps_increase}> 
                        < FaPlus />
                    </div>
                    <span> {target/1000}K </span>
                    <span className = "sub_heading"> target </span>
                    <div className = "user_target_buttons" onClick = {handle_steps_decrease}> 
                        < FaMinus />
                    </div>
                </div>
            </div>

            <div className = "user_workout_time">
                <div className = "user_dates">
                    <span> <FiUserCheck className = "user_workout_icons"/>  {props.user.performed_date.getDate() + " " + Months[props.user.performed_date.getMonth()]}  </span>
                    <span id = {Scheduled_id}> <TbCalendarTime className = "user_workout_icons"/>  {props.user.scheduled_date.getDate() + " " + Months[props.user.scheduled_date.getMonth()]}  </span>
                </div>
                {(props.user.feedback) ? (
                        <div className = 'user_workout_buttons red'>
                             <div> <TbExclamationMark /> </div>
                        </div>
                    ) : (
                        <div className = 'user_workout_buttons'>
                            <div><MdKeyboardArrowRight/></div>
                        </div>
                    )
                    
                }
            </div>

            <div className = "user_steps">
                <div className = "progress_calories_bar" onMouseOver = {handle_mouse_over} onMouseLeave = {handle_mouse_leave} id = {calorie_id}>
                    <div className = "user_calories_steps" >
                        <span>{calorie_intake}</span>
                        <span className = "sub_heading"> calories </span>
                    </div>

                    {hovering ? (
                        <Tooltip protien = {props.user.protien}
                        fats = {props.user.fats}
                        carbs = {props.user.carbs}/>
                    ) : (<></>)}
                </div>

                <div className = "user_target_steps">
                    <div className = "user_target_buttons" onClick={handle_calorie_increase}> 
                        < FaPlus />
                    </div>
                    <span> {calorie_target/1000}K </span>
                    <span className = 'sub_heading'> target </span>
                    <div className = "user_target_buttons" onClick = {handle_calorie_decrease}> 
                        < FaMinus />
                    </div>                    
                </div>


                <div className = 'user_workout_buttons'>
                    <div><MdKeyboardArrowRight/></div>
                </div>
            </div>

            <div  className = "user_bell_button">
                <div>
                    <TbBell/>
                </div>
            </div>

        </div>
    )
}

export default User;