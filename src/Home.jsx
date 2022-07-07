import FormRenderer from '@manojadams/metaforms';
import { Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack } from '@mui/material';
import React, { Fragment, useState } from 'react';
import schemamodel from './examples/home-example';
import SettingsIcon from '@mui/icons-material/Settings';
import MPDialog from './Dialog';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Home() {
    const [schema, setSchema] = useState(schemamodel);
    const [value, setValue] = useState(schemamodel.theme.type);
    const [grouping, setGrouping] = useState(schemamodel.theme.sectionLayout);
    const [variant, setVariant] = useState(schemamodel.theme?.mui?.variant?schemamodel.theme?.mui?.variant:'');
    const [size, setSize] = useState(schemamodel.theme?.mui?.size?schemamodel.theme?.mui?.size:'');
    const [spacing, setSpacing] = useState(schemamodel.theme.spacing);
    const [open, setOpen] = useState(false);
    const [dir, setDir] = useState('row');
    const [fullWidth, setFullwidth] = useState(false);
    const [showMetaForm, setShowMetaForm] = useState(false);
    const stackRef = useRef();
    useEffect(() => {
        if (stackRef.current.clientWidth <=500) {
            setDir('column');
            setFullwidth(true);
        } else {
            setDir('row');
            setFullwidth(undefined);
        }
    },[stackRef]);
    useEffect(() => {
        setShowMetaForm(false);
        setTimeout(() => {
            setShowMetaForm(true);
        }, 1000);
    },[schema]);
    const handleModelChange = (model) => {
        setSchema(model);
        setValue(model.theme.type);
        setGrouping(model.theme.sectionLayout);
        setOpen(false);
    }
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
    const onChangeSize = (e) => {
        const val = e.target.value;
        if (val) {
            if (!schema.theme.mui) schema.theme.mui = {};
            schema.theme.mui.size = val;
            setSize(val);
            setSchema({...schema});
        }
    }
    const onChangeVariant = (e) => {
        const val = e.target.value;
        if (val) {
            if (!schema.theme.mui) schema.theme.mui = {};
            schema.theme.mui.variant = val;
            setVariant(val);
            setSchema({...schema});
        }
    }
    return (
        <div>
            <div className='my-3 py-4 text-center' style={{
            backgroundColor: 'whitesmoke'
        }}>
            <Stack direction={dir} justifyContent="center" spacing={2} ref={stackRef}>
                <Item>
                    <FormControl className='mx-md-1' variant='standard' fullWidth={fullWidth} sx={{
                                minWidth: '100px'
                            }}>
                        <InputLabel id="a1">Theme</InputLabel>
                        <Select label="Select theme" value={value} onChange={onChangeTheme} placeholder="">
                            <MenuItem value="bootstrap">Bootstrap</MenuItem>
                            <MenuItem value="mui">Mui</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
                <Item>
                    <FormControl className='mx-md-1' variant='standard' fullWidth={fullWidth} sx={{
                                minWidth: '100px'
                            }}>
                        <InputLabel id="a2">Layout</InputLabel>
                        <Select label="Select grouping" value={grouping} onChange={onChangeLayout} placeholder="Select layout">
                            <MenuItem value="default">Default</MenuItem>
                            <MenuItem value="tabs">Tabs</MenuItem>
                            <MenuItem value="wizard">Wizard</MenuItem>
                            <MenuItem value="stepper">Stepper</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
                {
                    value === 'mui' && 
                    <Fragment>
                        <Item>
                            <FormControl className='mx-md-1 min-vw-2' variant='standard' fullWidth={fullWidth} sx={{
                                minWidth: '100px'
                            }}>
                                <InputLabel id="a3">Variant</InputLabel>
                                <Select value={variant} onChange={onChangeVariant} placeholder="Variant">
                                    <MenuItem value="">Choose</MenuItem>
                                    <MenuItem value="standard">Standard</MenuItem>
                                    <MenuItem value="filled">Filled</MenuItem>
                                    <MenuItem value="outlined">Outline</MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
                        <Item>
                            <FormControl className='mx-md-1' variant='standard' fullWidth={fullWidth} sx={{
                                minWidth: '100px'
                            }}>
                                <InputLabel id="a3">Size</InputLabel>
                                <Select value={size} onChange={onChangeSize} placeholder="Size">
                                    <MenuItem value="">Choose</MenuItem>
                                    <MenuItem value="small">Small</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
                    </Fragment>
                }
                </Stack>
                <Button variant="standard" onClick={()=>setOpen(true)} sx={{
                    position: 'fixed',
                    right: 0,
                    bottom: 0
                }}>
                    <SettingsIcon sx={{
                        float: 'right',
                        margin: '12px'
                    }}/>
                </Button>
            </div>
            <div>
                {
                    showMetaForm && 
                    <FormRenderer schema={schema}></FormRenderer>
                }
            </div>
            <MPDialog open={open} model={schema} 
                handleModelChange={handleModelChange}
                handleClose={()=>setOpen(false)}/>
        </div>
    )
}


const Item = styled(Paper)(() => ({
    textAlign: 'center',
    backgroundColor: 'whitesmoke'
}));