import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const FormType = () => {
    
    return (
        <div className='m-4'>
            <h3>Form Builder</h3>
            <Outlet />
        </div>
    )
}

export default FormType;