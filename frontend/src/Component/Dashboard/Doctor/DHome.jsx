// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from '../../../Navbar/Navbar'
import Prediction from './Prediction';
import Chat from './Chat';
import Appointments from './Appoinments';
import Healthmetrics from './Healthmetrics';


const DHome = () => {
    const [selected, setSelected] = useState('prediction'); // Default selected link   
    
    
    return (
        <>
            {/* <Navbar /> */}
            <div style={{ display: 'flex' }}>
                <Sidebar setSelected={setSelected} />
                <div style={{ padding: '20px', flex: 1 }}>
                    {/* <h2>Selected: {selected}</h2> Display the selected link */}
                    {(() => {
    switch (selected) {
        case 'appoinment':
            return <Appointments />;
        case 'health':
            return <Healthmetrics />;
        case 'chat':
            return <Chat />;
        
    }
})()}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DHome;