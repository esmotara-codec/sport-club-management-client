import React from 'react';
import Insight from '../Insight/insight';
import useRole from '../../../hook/useRole';

const AdminDashBoard = () => {
    const {role} = useRole();
   
    return (
        <div>
            <Insight role= {role}/>
        </div>
    );
};

export default AdminDashBoard;