import React from 'react';
import FormRenderer from '@manojadams/metaforms';
export default function Example (props){
    return (
        <div className='col'>
            <h1 className='my-md-4'>MetaForms Renderer</h1>
            <FormRenderer schema={props.schema}></FormRenderer>
        </div>
    )
}