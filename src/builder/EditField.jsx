import React, { useState } from 'react';
import { options } from './Builder.data';

const EditField = ({field, onUpdate, onClose}) => {
    const [f, setF] = useState(field);
    const [isOptionsTypeSelected, setOptionTypeSelected] = useState();

    const updateOptionType = () => {
        if (['select', 'radio', 'radio-button', 'checkbox'].indexOf(f.displayType) >= 0) {
            setOptionTypeSelected(true);
        } else {
            setOptionTypeSelected(false);
        }
    };

    return (
        <>
            <h4 style={{marginTop: "24px"}}>Edit field {field.name}</h4>
            <div className="form-group">
                {/* <label htmlFor="Name"></label> */}
                <input className="form-control" type="text" placeholder='Name' value={f.name} />
            </div>
            <div className="form-group">
                {/* <label htmlFor=''>Display Name</label> */}
                <input className="form-control" type="text" placeholder='Display name' value={f.displayName} onChange={(e) => {
                    f.displayName = e.target.value;
                    setF({...f});
                }}/>
            </div>
            <div className="form-group">
                <label>Display Type</label>
                <select className="form-control" placeholder='Type'
                    value={f.displayType}
                    onChange={updateOptionType}>
                    <option selected={f.displayType === 'text'?true:null}>text</option>
                    <option selected={f.displayType === 'select'?true:null}>select</option>
                    <option selected={f.displayType === 'date'?true:null}>date</option>
                    <option selected={f.displayType === 'number'?true:null}>number</option>
                    <option selected={f.displayType === 'radio-button'?true:null}>radio-button</option>
                    <option selected={f.displayType === 'radio'?true:null}>radio</option>
                    <option selected={f.displayType === 'checkbox'?true:null}>checkbox</option>
                    <option selected={f.displayType === 'search'?true:null}>search</option>
                    <option selected={f.displayType === 'email'?true:null}>email</option>
                    <option selected={f.displayType === 'header'?true:null}>header</option>
                </select>
            </div>
            {/* {
                isOptionsTypeSelected && 
                <div className="form-group">
                    <label htmlFor="">Options</label>
                    <select className='form-control'>
                    {
                        options.map(o => (<option>{o}</option>))
                    }
                    </select>
                </div>
            } */}
            <div className="form-group">
                <label>Display Width</label>
                <select className='form-control' value={f.displayProps?.md}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option selected={true}>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                </select>
            </div>
            {/* <div className="form-group">
                <label>Validation</label>
                <select className='form-control' value={}>
                    <option>Select</option>
                    <option value="required">Required</option>
                    <option value="pattern">Pattern</option>
                    <option value="min">Min</option>
                    <option value="max">Max</option>

                </select>
            </div>
            <div className="form-group">
                <label>Validation detail</label>
                <input type="text" className="form-control" />
            </div> */}
            <button onClick={() => {
                onUpdate(f);
                onClose();
            }}>Update field</button>
            <button onClick={onClose}>Close</button>
        </>
    )
}

export default EditField;