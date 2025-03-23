// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from '../../../Navbar/Navbar' 
import Dconfirm from './Dconfirm';
import Panalytics from './Panalytics';

const AHome = () => {
    const [selected, setSelected] = useState('doctorconfirmation'); // Default selected link   
    
    
    return (
        <>
            {/* <Navbar /> */}
            <div style={{ display: 'flex' }}>
                <Sidebar setSelected={setSelected} />
                <div style={{ padding: '20px', flex: 1 }}>
                    {/* <h2>Selected: {selected}</h2> Display the selected link */}
                    {(() => {
    switch (selected) {
        case 'doctorconfirmation':
            return <Dconfirm />;
        case 'analytics':
            return <Panalytics/>;
            
        
    }
})()}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default AHome;