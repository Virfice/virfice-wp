import React from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";

const FeatureListItem = ({title, Illustration}) =>{

    return(
        <div className={`${VIRFICE_APP_PREFIX}-feature-list-item ${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-4`}>
            <div className={`${VIRFICE_APP_PREFIX}-illustration-wrapper`}>
                {Illustration}
            </div>
            <p className={`${VIRFICE_APP_PREFIX}-title`}>{title}</p>
        </div>
    )
}

export default FeatureListItem;