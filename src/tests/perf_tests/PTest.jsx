import React from "react";
import Example from "../../Example";
import Example4 from "../../Example4";

class PTest extends React.Component{
    constructor() {
        super();
        this.state = {
            time: window.performance.now()
        };
    }
    componentDidMount() {
        this.setState({time: window.performance.now() - this.state.time})
    }
    render() {
        return (
            <div>
                <div className="d-none">
                    <Example />
                </div>
                <h1>Time to render example: {this.state.time}</h1>
            </div>
        )
    }    
}

export default PTest;
