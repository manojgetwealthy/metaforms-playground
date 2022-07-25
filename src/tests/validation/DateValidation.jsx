import FormRenderer from '@manojadams/metaforms';
import * as schema from './min-date.json';

const DateValidation = () => {
    return (
        <div className='mt-4 mt-md-4'>
            <FormRenderer schema={schema} onSubmit={(data) => {
                alert('hi');
            }}></FormRenderer>
        </div>
    )
}

export default DateValidation;