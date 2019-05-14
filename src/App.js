import React from "react";
import "./App.css";
import Nav from "./MyNavs";
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    key: 1,
                    text: "沃尔夫赛赛分"
                },
                {
                    key: 2,
                    text: "问赛风的"
                },
                {
                    key: 3,
                    text: "而大夫"
                },
                {
                    key: 4,
                    text: "郭彬彬"
                },
                {
                    key: 5,
                    text: "对方地方"
                },
                {
                    key: 6,
                    text: "塞复赛"
                },
                {
                    key: 7,
                    text: "赛风森的"
                }
            ]
        };
    }
    render() {
        return (
            <div>
                <Nav data={this.state.data} />
                <div onClick={this.handler.bind(this)}>click</div>
            </div>
        );
    }
    handler() {
        this.setState({
            data: [
                ...this.state.data,
                {
                    key: Math.random(),
                    text: "我问赛风赛"
                }
            ]
        });
    }
}
