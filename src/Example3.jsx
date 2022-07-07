import React from 'react';
import FormRenderer from '@manojadams/metaforms';
import schema from './examples/example3';
export default function Example3 (props){
    return (
        <div>
            <FormRenderer schema={schema}></FormRenderer>
        </div>
    )
}