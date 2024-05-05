import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "../../conf";

const Card = ({
    children,
    className=false
}) =>{
    const cn = classnames({
        [VIRFICE_APP_PREFIX + '-card'] : true,
    },className);
    return <div className={cn}>{children}</div>
}

export default Card;