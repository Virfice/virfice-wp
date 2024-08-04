import React from "react";
import Landing from "./Landing";
import { hasQueryParamValue } from "../../functions";
import BrandSettings from "./BrandSettings";
import WooEmailList from "./WooEmailList";
import EmailEditor from "./WooEmailList/EmailEditor";
import Settings from "./Settings";

//Need to implement route for every dashboard menu
const Pages = () => {
    if(hasQueryParamValue('menu','brand-settings')){
        return <BrandSettings />
    }
    if(hasQueryParamValue('menu','woo-email-list')){
        return <WooEmailList />
    }
    if(hasQueryParamValue('menu','woo-email-edit')){
        return <EmailEditor />
    }
    if(hasQueryParamValue('menu','settings')){
        return <Settings />
    }
    return <Landing />
};

export default Pages;
