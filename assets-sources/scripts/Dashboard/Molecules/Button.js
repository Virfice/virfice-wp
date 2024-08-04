import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "../../conf";

const Button = ({
    title="", 
    icon,
    leftIcon,
    isActive,
    type="primary", // primary | outline | danger
    small,
    onClick = () =>{},
    link=false,
    target=false
}) =>{

    const _onClick = () =>{
        if(link !== false){
            if(target === '_blank'){
                window.open(link, target);
            }else{
                window.location.href = link;
            }
        }
        if(onClick){
            onClick();
        }
    }
    const className = classnames({
        [VIRFICE_APP_PREFIX + '-btn'] : true,
        [VIRFICE_APP_PREFIX + '-btn-primary'] : type === 'primary',
        [VIRFICE_APP_PREFIX + '-btn-outline'] : type === 'outline',
        [VIRFICE_APP_PREFIX + '-btn-danger'] : type === 'danger',
        [VIRFICE_APP_PREFIX + '-btn-secondary'] : type === 'secondary',
        [VIRFICE_APP_PREFIX + '-btn-tertiary'] : type === 'tertiary',
        [VIRFICE_APP_PREFIX + '-btn-plain'] : type === 'plain',
        [VIRFICE_APP_PREFIX + '-active'] : isActive,
        [VIRFICE_APP_PREFIX + '-icon'] : icon,
        [VIRFICE_APP_PREFIX + '-small'] : small,
        ['label__mediumprominent']: true
    });
    return <button className={className} onClick={_onClick}>{leftIcon}{icon}{title}</button>
}

export default Button;