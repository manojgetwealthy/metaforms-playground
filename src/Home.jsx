import FormRenderer from '@manojadams/metaforms';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import schemamodel from './examples/home-example';
import SettingsIcon from '@mui/icons-material/Settings';
export default function Home() {
    const [schema, setSchema] = useState(schemamodel);
    const [value, setValue] = useState(schemamodel.theme.type);
    const [grouping, setGrouping] = useState(schemamodel.theme.sectionLayout);
    const [spacing, setSpacing] = useState(schemamodel.theme.spacing);
    const onChangeTheme = (e) => {
        if (e.target.value) {
            schema.theme.type = e.target.value;
            setValue(e.target.value);
            setSchema({...schema});
        }
    }
    const onChangeLayout = (e) => {
        const val = e.target.value;
        if (val) {
            schema.theme.sectionLayout = val;
            setGrouping(val);
            setSchema({...schema});
        }
    }
    const onChangeSpacing = (e) => {
        const val = e.target.value;
        if (val) {
            schema.theme.spacing = val;
            setSpacing(val);
            setSchema({...schema});
        }
    }
    return (
        <div className='col' >
            <div className='my-md-3 py-md-4' style={{
            backgroundColor: 'whitesmoke'
        }}>
                <FormControl className='mx-md-1'>
                    <InputLabel id="a1">Theme</InputLabel>
                    <Select label="Select theme" value={value} onChange={onChangeTheme} placeholder="">
                        <MenuItem value="bootstrap">Bootstrap</MenuItem>
                        <MenuItem value="mui">Mui</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='mx-md-1'>
                    <InputLabel id="a2">Layout</InputLabel>
                    <Select label="Select grouping" value={grouping} onChange={onChangeLayout} placeholder="Select layout">
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="tabs">Tabs</MenuItem>
                        <MenuItem value="wizard">Wizard</MenuItem>
                        <MenuItem value="stepper">Stepper</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className='mx-md-1'>
                    <InputLabel id="a3">V Spacing</InputLabel>
                    <Select value={spacing} onChange={onChangeSpacing}>
                        <MenuItem value="1">1x</MenuItem>
                        <MenuItem value="2">2x</MenuItem>
                        <MenuItem value="3">3x</MenuItem>
                        <MenuItem value="4">4x</MenuItem>
                    </Select>
                </FormControl>
                <SettingsIcon sx={{
                    float: 'right',
                    margin: '12px'
                }}/>
            </div>
            <div>
                <h1 className='my-md-4'>MetaForms</h1>
                {
                    schema && 
                    <FormRenderer schema={schema}></FormRenderer>
                }
            </div>
        </div>
    )
}