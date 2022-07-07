import React from 'react';
import FormRenderer from '@manojadams/metaforms';
import schema from './examples/example2';
export default function Example (props){
    return (
        <div className='mt-4 mt-md-4'>
            
            <FormRenderer schema={schema}></FormRenderer>
        </div>
    )
}