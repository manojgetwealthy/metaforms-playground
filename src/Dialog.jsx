import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { highlight, languages } from "prismjs";
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Editor from "react-simple-code-editor";
import './Dialog.css';
import { useEffect } from "react";

export default function MPDialog(props) {
    const [m1, m2] = useState(props.model);
    const [val, setVal] = useState();
    const [loaded, setLoaded] = useState(false);
    const ref = useRef();
    const update = (e) => {
        const value = ref.current.value;
        try {
            const obj = JSON.parse(value);
            m2(obj);
            props.handleModelChange(m1);

        } catch(e) {
            alert(e);
        }
    }

    useEffect(() => {
        m2(props.model);
        setVal(JSON.stringify(props.model, null, 4));
    },[props.model]);

    useEffect(() => {
        if (loaded) {
            props.handleModelChange(m1);
            props.handleClose();
        } else {
            // only first time
            setLoaded(true);
        }
    },[m1]);

    return(
        <Dialog open={props.open} onClose={props.close} fullWidth>
            <DialogTitle>Edit</DialogTitle>
            <Button variant="outlined" sx={{
                    display: 'inline',
                    position: 'absolute',
                    width: 'fitContent',
                    right: '60px',
                    top: '16px',
                    color: 'green'
            }} onClick={(e) => update(e)}> Update
            </Button>
            <Button sx={{
                    display: 'inline',
                    position: 'absolute',
                    width: 'fitContent',
                    right: '0px',
                    top: '16px',
                    color: '#000'
            }} onClick={props.handleClose}>
                <CloseIcon/>
            </Button>
            <DialogContent>
                <textarea className="editor" ref={ref} defaultValue={val}>
                </textarea>
                {/* <Editor
                    value={JSON.stringify(m1,null,4)}
                    onValueChange={code => {
                        const obj = JSON.parse(code);
                        m2(obj);
                    }}
                    highlight={code => highlight(code, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 12,
                    }}
                    /> */}
            </DialogContent>
        </Dialog>
    )
}