import React from 'react';
import FormRenderer from '@manojadams/metaforms';
import schema from './examples/example4';
export default function Example4 (props){
    return (
        <div>
            <FormRenderer schema={schema}></FormRenderer>
        </div>
    )
}