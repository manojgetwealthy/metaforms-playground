import MetaForm from '@manojadams/metaforms';
import React, { useEffect, useRef, useState } from 'react';
import { getOptions, options } from './Builder.data';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import './Builder.css';
import EditField from './EditField';
import Utils from './Util';
const defaultTheme = {type: 'mui', 'sectionLayout': 'default', 'mui': {'tabs':{'variant': 'fullWidth'}}};
const tabTheme = {type: 'mui', 'sectionLayout': 'tabs', 'mui': {'tabs':{'variant': 'fullWidth'}}};
const defaultErrorMsg = 'This field is required';

const Builder = ({type}) => {
    const [field, setField] = useState('');
    const [fields, setFields] = useState([]);
    const [sections, addToSection] = useState([]);
    const [formType, setFormType] = useState(type);
    const [theme, setTheme] = useState(defaultTheme);
    const [schema, setSchema] = useState({});
    const [defaultSchema, setDef] = useState('default');
    const [shown, setShown] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [isOptionsTypeSelected, setOptionTypeSelected] = useState(false);
    const [isEditField, setEditField] = useState(false);

    const sRef = useRef();

    const nRef = useRef();
    const dRef = useRef();
    const tRef = useRef();
    const oRef = useRef();
    const displayRef = useRef();
    const fileRef = useRef();

    const vRef = useRef();
    const vDetailRef = useRef();

    const clearIcons = () => {
        const icon = document.querySelector('#builder-copy-icon');
        icon.style.left = '-100px';
        icon.style.top = '-100px';
    }

    const updateOptionType = () => {
        if (['select', 'radio', 'radio-button', 'checkbox'].indexOf(tRef?.current?.value) >= 0) {
            setOptionTypeSelected(true);
        } else {
            setOptionTypeSelected(false);
        }
    };

    const toggleForm = () => {
        setShown(false);
        setTimeout(() => {setShown(true)}, 300);
    }

    useEffect(() => {
        if (formType === 'simple') {
            setTheme(defaultTheme);
        } else {
            setTheme(tabTheme);
        }
    }, [formType])

    useEffect(() => {
        const sc = localStorage.getItem('schema');
        if (sc) {
            const obj = JSON.parse(sc);
            if (obj.fields) {
                const sects = obj.fields.filter(f => f?.meta?.type === 'section').map(f => f.name);
                addToSection(sects);
                setFields(obj.fields ? obj.fields : []);
            }
        }
    }, []);

    useEffect(() => {
        toggleForm();
        setSchema({fields, theme});
    }, [fields, theme]);

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
           
            let f;
            if (tRef.current.value === 'hidden') {
                f = {
                    name: nRef.current.value,
                    meta: {
                        type: 'hidden'
                    }
                }
            } else {
                let validation;
                if (vRef.current.value && vRef.current.value != 'Select') {
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
                const options = isOptionsTypeSelected ? getOptions(oRef.current.value) : undefined;
                f = {
                    name: nRef.current.value,
                    id: Date.now(),
                    meta: {
                        displayType: tRef.current.value,
                        displayName: dRef.current.value,
                        displayProps: {
                            md: displayRef.current.value
                        },
                        validation,
                        options
                    }
                };
            }
            nRef.current.value = '';
            dRef.current.value = '';
            tRef.current.value = '';
            displayRef.current.value = '';
            vRef.current.value = '';
            vDetailRef.current.value = '';
            if (formType === 'simple') {
                setFields([...fields, f]);
            } else {
                const matchField = fields.find(f => f.name === defaultSchema);
                if (matchField) {
                    matchField.fields.push(f);
                    setShown(false);
                    setFields([...fields]);
                    setTimeout(() => {setShown(true)}, 200)
                }
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
        setFields([]);
        addToSection([]);
        localStorage.setItem('schema', '');
        clearIcons();
        setField('');
    }
    const importSc = () => {
        fileRef.current.click();
    }
    const duplicateField = () => {
        if (field) {
            const f = {
                name: Utils.getUniqueName(fields, formType, field.name, defaultSchema),
                id: Date.now(),
                meta: {
                    displayName: field.displayName,
                    displayType: field.displayType,
                    displayProps: field.displayProps,
                    validation: field.validation,
                    options: field.options
                }
            }
            if (formType === 'simple') {
                setFields([...fields, f]);
            } else {
                const matchField = fields.find(f => f.name === field.section);
                if (matchField) {
                    matchField.fields.push(f);
                    setFields([...fields]);
                }
            }
        }
    }
    const deleteField = () => {
        if (field) {
            if (formType === 'simple') {
                const matchField = fields.find(f => f.name === field.name);
                if (matchField) {
                    let newFields = fields;
                    newFields.splice(fields.indexOf(matchField, 1));
                    setFields([...newFields]);
                    setField('');
                    clearIcons();
                }
            } else {
                const matchSection = fields.find(f => f.name === field.section);
                if (matchSection) {
                    const matchField = matchSection.fields.find(f => f.name === field.name);
                    if (matchField) {
                        // delete the field
                        matchSection.fields.splice(matchSection.fields.indexOf(matchField), 1);
                        setFields([...fields]);
                        setField('');
                        clearIcons();
                    }
                }
            }
        }
    }
    const updateField = (field) => {
        if (formType === 'simple') {
            let matchField = fields.find(f => f.id === field.id);
            if (!matchField) matchField = fields.find(f => f.name === field.name);
            if (matchField) {
                matchField.name = field.name;
                matchField.meta.displayName = field.displayName;
                matchField.meta.displayType = field.displayType;
                matchField.meta.displayProps = field.displayProps;
                matchField.meta.validation = field.validation;
                setFields([...fields]); 
            }
        } else {
            const matchSection = fields.find(f => f.name === field.section);
            if (matchSection) {
                let matchField = matchSection.fields.find(f => f.id === field.id);
                if (!matchField) matchField = matchSection.fields.find(f => f.name === field.name);
                if (matchField) {
                    matchField.name = field.name;
                    matchField.meta.displayName = field.displayName;
                    matchField.meta.displayType = field.displayType;
                    matchField.meta.displayProps = field.displayProps;
                    matchField.meta.validation = field.validation;
                    setFields([...fields]);
                }
            }
        }
    }
    const importFile = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileReader = new FileReader();
            fileReader.onload = function(ev) {
                const result = ev.target.result;
                const jsonSchema = JSON.parse(result);
                const sects = jsonSchema.fields.filter(f => f?.meta?.type === 'section').map(f => f.name);
                setShown(false);
                setTheme(jsonSchema.theme);
                setFields(jsonSchema.fields);
                addToSection(sects);
                setTimeout(()=>{setShown(true)}, 300);
            }
            fileReader.readAsText(files[0]);
        }
    }
    const exportSc = () => {
        const jsonSchema = JSON.stringify(schema);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([jsonSchema], {type: 'text/json'}))
        link.download = 'schema.json';
        link.click();
    };
    const updateFormType = (e) => {
        const value = e.target.value;
        setFormType(value);
        setShown(true);
    }
    return (
        <div className='container'>
            <div id="builder-copy-icon">
                <ContentCopyIcon onClick={duplicateField} />
                <HighlightOffIcon onClick={deleteField} />
                <ModeEditOutlineOutlinedIcon onClick={() => setEditField(true)} />
            </div>
            <div className='row'>
                <div className="col-3 mp-autoscroll">
                    <button className='btn btn-sm' onClick={clear}>Clear</button>
                    <input className='d-none' type='file' accept=".json" ref={fileRef} onChange={importFile} />
                    <button className='btn btn-sm' onClick={importSc}>Import</button>
                    <button className='btn btn-sm' onClick={exportSc}>Export</button>
                    {
                        formType === 'grouped' && 
                        <>
                            <h4 className='mt-2'>Add a section</h4>
                            <div className="form-group">
                                <input type="text" className="form-control" ref={sRef} placeholder="Section name" />
                            </div>
                            <button onClick={addSection}>Add</button>
                        </>
                    }

                    {
                        isEditField && 
                        <EditField field={field} onUpdate={updateField} onClose={() => {
                            setEditField(false);
                        }}/>
                    }
                    <h4 style={{marginTop: "24px"}}>Add a field</h4>
                    <div className="form-group">
                        {/* <label htmlFor="Name"></label> */}
                        <input className="form-control" type="text" placeholder='Name *' ref={nRef} />
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor=''>Display Name</label> */}
                        <input className="form-control" type="text" placeholder='Display name *' ref={dRef}/>
                    </div>
                    <div className="form-group">
                        <label>Display Type *</label>
                        <select className="form-control" placeholder='Type' ref={tRef} multiple={true} onChange={updateOptionType}>
                            <option defaultValue={'text'}>text</option>
                            <option>select</option>
                            <option>date</option>
                            <option>number</option>
                            <option>radio-button</option>
                            <option>radio</option>
                            <option>checkbox</option>
                            <option>search</option>
                            <option>email</option>
                            <option>hidden</option>
                            <option>header</option>
                        </select>
                    </div>
                    {
                        isOptionsTypeSelected && 
                        <div className="form-group">
                            <label htmlFor="">Options</label>
                            <select className='form-control' ref={oRef}>
                            {
                                options.map(o => (<option>{o}</option>))
                            }
                            </select>
                        </div>
                    }
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
                            pageNumber={pageNum}
                            onEvent={(payload) => {
                                switch (payload.type) {
                                    case 'tab_change':
                                        const activeIndex = payload.index;
                                        setDef(sections[activeIndex]);
                                        setPageNum(activeIndex+1);
                                        break;
                                    case 'field_click':
                                        const details = payload.detail;
                                        const section = payload.section;
                                        const event = payload.event;
                                        const targetPosition = payload.event.target.getBoundingClientRect();
                                        event.target.classList.add('builder-edited');
                                        const icon = document.querySelector('#builder-copy-icon');
                                        icon.style.left = targetPosition.x + targetPosition.width + 'px';
                                        icon.style.top = event.pageY - 10 + 'px';
                                        let matchField;
                                        if (formType === 'simple') {
                                            matchField = fields.find(f => f.name === payload.name);
                                        } else {
                                            const matchSectin = fields.find(f => f.name === section);
                                            if (matchSectin) {
                                                matchField = matchSectin.fields.find(f => f.name === payload.name);
                                            }
                                        }
                                        setField({
                                            name: payload.name,
                                            displayName: details.displayName,
                                            displayType: details.displayType,
                                            displayProps: details.displayProps,
                                            validation: details.validation,
                                            options: details.options,
                                            section: section,
                                            id: matchField?.id || ''
                                        })
                                        // to do
                                }
                            }}
                            onSubmit={(formData) => {
                                //todo
                        }}/>
                    </div>
                }
                </div>
            </div>
            
        </div>
    )
};

export default Builder;