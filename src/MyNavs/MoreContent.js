import React, { Component } from "react";

export default class MoreContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            moreHeight: 0
        };
    }
    handler() {
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        let { data, heightStr, saveRef } = this.props;
        const { show, moreHeight } = this.state;
        return (
            <li
                key={"more"}
                className="list-item more"
                ref={saveRef("more")}
                onMouseEnter={this.handler.bind(this)}
                onMouseLeave={this.handler.bind(this)}
            >
                <p
                    style={{
                        lineHeight: heightStr
                    }}
                >
                    更多
                </p>
                <div
                    className="more-content"
                    style={{
                        top: heightStr,
                        display: show && moreHeight ? "block" : "none",
                        maxHeight: `${moreHeight}px`
                    }}
                >
                    {data.map(item => {
                        return <div key={item.key}>{item.text}</div>;
                    })}
                </div>
            </li>
        );
    }
    componentDidMount() {
        const { getRef } = this.props;
        let rect = getRef("more").getBoundingClientRect();
        let moreHeight =
            document.documentElement.getBoundingClientRect().height -
            20 -
            rect.top -
            rect.height;
        this.setState({
            moreHeight
        });
    }
}
