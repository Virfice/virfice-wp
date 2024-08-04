import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "../../conf";

const Badge = ({
    title,
    type,
    leftIcon,
    className=false
}) =>{
    const cn = classnames({
        [VIRFICE_APP_PREFIX + '-badge'] : true,
        [VIRFICE_APP_PREFIX + '-active'] : type === 'active',
        [VIRFICE_APP_PREFIX + '-success'] : type === 'success',
        [VIRFICE_APP_PREFIX + '-warning'] : type === 'warning',
        [VIRFICE_APP_PREFIX + '-in-active'] : type === 'in-active',
    },className);

    return <div className={cn}>{leftIcon}{title}</div>
}

export default Badge;