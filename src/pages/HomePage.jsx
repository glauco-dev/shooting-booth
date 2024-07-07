import React from "react";
import Manager from "../Manager";

export default () => {
    const [userInfo, setUserInfo] = React.useState(Manager.state['user']);

    return <>
        <img src={userInfo.foto} />
        <h1>Welcome, {userInfo.email}</h1>

        {/* table of info */}
    </>
}