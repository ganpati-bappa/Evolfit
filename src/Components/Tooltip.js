import React, { useState, useEffect } from 'react';

import './../SCSS/Tooltip.scss'

export const Tooltip = (props) => {

    let [protien, setProtien] = useState(0);
    let [fats, setFats] = useState(0);
    let [carbs, setCarbs] = useState(0);

    const id_protien = `user_protien`;
    const id_fats = `user_fats`;
    const id_carbs = `user_carbs`; 

    useEffect(() => {
        let protien_bar = document.getElementById(id_protien);
        let fats_bar = document.getElementById(id_fats);
        let carbs_bar = document.getElementById(id_carbs);

        protien_bar.style.backgroundColor = "#f45c84";
        protien_bar.nextElementSibling.style.color = "#f45c84";
        carbs_bar.style.backgroundColor = "#f5c90f";
        carbs_bar.nextSibling.style.color = "#f5c90f";
        fats_bar.style.backgroundColor = "#05bff1";
        fats_bar.nextSibling.style.color = "#05bff1";

        const handle_level = setInterval(() => {
            let flag = true;
            if (protien < props.protien){
                flag = false;
                setProtien(protien++);
                protien_bar.style.width = `${(protien * 100)/70}%`;
            }
            if (fats < props.fats) {
                flag = false;
                setFats(fats++);
                fats_bar.style.width = `${(fats * 100)/70}%`;
            }
            if (carbs < props.carbs) {
                flag = false;
                setCarbs(carbs++);
                carbs_bar.style.width = `${(carbs * 100)/70}%`;
            }
            if (flag == true)
                clearInterval(handle_level);
        },20);
    },[])

    return (
        <div className = "Tooltip_overall">
            <div className = "Tooltip_tip"></div>

            <div className = "tooltip_holder">
                <div className = "tooltip_nutrient_holder">
                    <span className = "tooltip_nutrient_label">
                        <span>Protien</span>
                        <span>70g</span>
                    </span>
                    <div className = "tooltip_nutrient_levels_full">
                        <div className = "tooltip_nutrient_user_level" id = {id_protien}>

                        </div>
                        <div>{protien + 1}g</div>
                    </div>
                </div>

                <div className = "tooltip_nutrient_holder">
                    <span className = "tooltip_nutrient_label">
                        <span>Fats</span>
                        <span>70g</span>
                    </span>

                    <div className = "tooltip_nutrient_levels_full">
                        <div className = "tooltip_nutrient_user_level" id = {id_fats}></div>
                        <div>{fats + 1}g</div>
                    </div>
                </div>

                <div className = "tooltip_nutrient_holder">
                    <span className = "tooltip_nutrient_label">
                        <span>Carbs</span>
                        <span>70g</span>
                    </span>

                    <div className = "tooltip_nutrient_levels_full">
                        <div className = "tooltip_nutrient_user_level" id = {id_carbs}>
                        </div>
                        <div>{carbs + 1}g</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tooltip;