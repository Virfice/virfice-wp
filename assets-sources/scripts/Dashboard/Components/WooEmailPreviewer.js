import React from "react";

const WooEmailPreviewer = () =>{

    return(
        <div style={{width: 638}}>
            <Card>
                <div className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-w-100`}>
                    <TopActionBar />
                    <Preview />
                </div>
            </Card>
        </div>
    )
}