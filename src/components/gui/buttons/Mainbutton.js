import React from 'react';

// css imports
import './Mainbutton.css';

// third party imports
import { Link } from 'react-router-dom';

function Mainbutton(props) {
    function clickAnimation() {
        const buttons = document.querySelectorAll('a');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                let x = e.clientX - e.target.offsetLeft;
                let y = e.clientY - e.target.offsetTop;
    
                let ripples = document.createElement('span');
                ripples.style.left = x + 'px';
                ripples.style.top = y + 'px';
                this.appendChild(ripples);
    
                setTimeout(() => {
                    ripples.remove()
                }, 1000);
            })
        })
    } 

    return (
        <Link to={props.link}>
            <button className="main-button">{props.children}</button>
        </Link>
    )
}

export default Mainbutton;