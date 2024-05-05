import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import classNames from "classnames";

const DataTable = ({children, className}) =>{
    const cn = classNames({
        [VIRFICE_APP_PREFIX + '-data-table'] : true,
    },className);
    return(
        <table className={cn}>
            {children}
        </table>
    )
}

export default DataTable;