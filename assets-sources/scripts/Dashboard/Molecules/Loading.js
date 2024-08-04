import React from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import classNames from "classnames";

const Loading = ({
    className=false
}) =>{
    const cn = classNames({
        [VIRFICE_APP_PREFIX + '-loading'] : true,
    },className);
    return(
        <div className={cn}>Loading...</div>
    )
}

export default Loading;