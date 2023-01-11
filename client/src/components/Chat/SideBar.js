import React from 'react';

function SideBar() {

    return (<div className="chat__sidebar">
        <h2>Chat App</h2>

        <div>
            <h4 className="chat__header">ACTIVE USERS</h4>
            <div className="chat__users">
                <p>User 1</p>
                <p>User 2</p>
                <p>User 3</p>
                <p>User 4</p>
            </div>
        </div>
    </div>);
}

export default SideBar;