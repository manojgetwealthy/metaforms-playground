import MetaForm from '@manojadams/metaforms';
import React, { useEffect, useRef, useState } from 'react';
const defaultTheme = {type: 'mui', 'sectionLayout': 'tabs', 'mui': {'tabs':{'variant': 'fullWidth'}}};

const Builder = () => {
    const [fields, setFields] = useState([]);
    const [sections, addToSection] = useState([]);
    const [schema, setSchema] = useState({fields: [], theme: defaultTheme});
    const [defaultSchema, setDef] = useState('default');
    const [shown, setShown] = useState(true);

    const sRef = useRef();

    const nRef = useRef();
    const dRef = useRef();
    const tRef = useRef();
    const displayRef = useRef();

    const vRef = useRef();
    const vDetailRef = useRef();

    const toggleForm = () => {
        setShown(false);
        setTimeout(() => {setShown(true)}, 300);
    }

    useEffect(() => {
        const sc = localStorage.getItem('schema');
        if (sc) {
            const obj = JSON.parse(sc);
            if (obj.fields) {
                const sects = obj.fields.filter(f => f?.meta?.type === 'section').map(f => f.name);
                addToSection(sects);
                setFields(obj.fields ? obj.fields : []);
                toggleForm();
            }
        }
    }, []);

    useEffect(() => {
        setSchema({fields, theme: defaultTheme});
        localStorage.setItem('schema', JSON.stringify(schema));
    }, [fields]);

    useEffect(() => {
        if (sections && sections.length > 0) {
            setDef(sections[sections.length - 1]);
            const lfields = [];
            sections.forEach(s => {
                const match = fields.find(f => f.name === s);
                lfields.push({
                    name: s,
                    meta: {
                        type: 'section'
                    },
                    fields: match ? match.fields : []
                })
            });
            setFields(lfields);
            setShown(false);
            setTimeout(() => {setShown(true)}, 300);
        }
    }, [sections]);

    const addField = () => {
        if (nRef.current.value && dRef.current.value && tRef.current.value) {
            let validation;
            if (vRef.current.value) {
                validation = {
                    [vRef.current.value]: true
                }
                switch (vRef.current.value) {
                    case 'required':
                        validation.required_detail = {
                            errorMsg: vDetailRef.current.value
                        }
                        break;
                    default:
                        let name = vRef.current.value + '_detail';
                        validation[name] = vDetailRef.current.value;
                }
            };
            const f = {
                name: nRef.current.value,
                meta: {
                    displayType: tRef.current.value,
                    displayName: dRef.current.value,
                    displayProps: {
                        md: displayRef.current.value
                    },
                    validation
                }
            };
            nRef.current.value = '';
            dRef.current.value = '';
            tRef.current.value = '';
            displayRef.current.value = '';
            vRef.current.value = '';
            vDetailRef.current.value = '';
            const matchField = fields.find(f => f.name === defaultSchema);
            if (matchField) {
                matchField.fields.push(f);
                setShown(false);
                setFields([...fields]);
                setTimeout(() => {setShown(true)}, 200)
            }
        }
    }
    const addSection = () => {
        if (sRef.current.value) {
            const val = sRef.current.value.trim();
            addToSection([...sections, val]);
            sRef.current.value = '';
        }
    }
    const clear = () => {
        setSchema({fields: [], theme: defaultTheme});
    }
    const exportSc = () => {
        const jsonSchema = JSON.stringify(schema);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([jsonSchema], {type: 'text/json'}))
        link.download = 'schema.json';
        link.click();
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className="col-3">
                    <h2>Schema Builder (tabs)</h2>
                    <button className='btn btn-sm' onClick={clear}>Clear</button>
                    <button className='btn btn-sm' onClick={exportSc}>Export</button>
                    <h4>Add a section</h4>
                    <div className="form-group">
                        <input type="text" className="form-control" ref={sRef} placeholder="Section name" />
                    </div>
                    <button onClick={addSection}>Add</button>

                    <h4 style={{marginTop: "24px"}}>Add a field</h4>
                    <div className="form-group">
                        {/* <label htmlFor="Name"></label> */}
                        <input className="form-control" type="text" placeholder='Name' ref={nRef} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor=''>Display Name</label> */}
                        <input className="form-control" type="text" placeholder='Display name' ref={dRef}/>
                    </div>
                    <div className="form-group">
                        <label>Display Type</label>
                        <select className="form-control" placeholder='Type' ref={tRef} multiple={true}>
                            <option defaultValue={'text'}>text</option>
                            <option>select</option>
                            <option>date</option>
                            <option>number</option>
                            <option>radio-button</option>
                            <option>search</option>
                            <option>hidden</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Display Width</label>
                        <select className='form-control' ref={displayRef}>
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
                    <div className="form-group">
                        <label>Validation</label>
                        <select className='form-control' ref={vRef}>
                            <option>Select</option>
                            <option value="required">Required</option>
                            <option value="pattern">Pattern</option>
                            <option value="min">Min</option>
                            <option value="max">Max</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Validation detail</label>
                        <input type="text" className="form-control" ref={vDetailRef} />
                    </div>
                    <button onClick={addField}>Add field</button>
                </div>
                <div className="col-9">
                {
                    shown && 
                    <div>
                        <MetaForm 
                            schema={schema} 
                            onEvent={(payload) => {
                                switch (payload.type) {
                                    case 'tab_change':
                                        const activeIndex = payload.index;
                                        setDef(sections[activeIndex]);
                                        break;
                                    case 'field_click':
                                        const details = payload.detail;
                                        const section = payload.section;
                                        // to do
                                }
                            }}
                            onSubmit={(formData) => {
                            console.log(formData);
                        }}/>
                    </div>
                }
                </div>
            </div>
            
        </div>
    )
};

export default Builder;