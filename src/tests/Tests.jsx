import React from 'react';
import { useParams } from "react-router-dom";
import DateValidation from './validation/DateValidation';

const Tests = () => {
    const {id} = useParams();
    switch (id) {
        case 'date-validation':
            return (<DateValidation />)
        default:
            return (
                <div>Enter a test id</div>
            )
    }
}

export default Tests;