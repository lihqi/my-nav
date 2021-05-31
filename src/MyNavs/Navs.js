import React, { Component } from "react";
import debounce from "lodash/debounce";
import MoreContent from "./MoreContent";
import ResizeObserver from "resize-observer-polyfill";
const renderData = (data, saveRef, heightStr) => {
    return data.map(item => renderListItem(item, saveRef, heightStr));
};
const renderListItem = (item, saveRef, heightStr) => {
    return (
        <li key={item.key} className="list-item" ref={saveRef("" + item.key)}>
            <p
                style={{
                    lineHeight: heightStr
                }}
            >
                {item.text}
            </p>
        </li>
    );
};
export default class Navs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliceIndex: null
        };
    }
    render() {
        const { height = 60, data = [], saveRef, getRef } = this.props;
        const { sliceIndex } = this.state;
        let heightStr = null;
        if (height) {
            heightStr = `${height}px`;
        }
        let showData = [];
        let restData = [];
        if (sliceIndex !== null) {
            showData = data.slice(0, sliceIndex);
            restData = data.slice(sliceIndex);
        }
        return (
            <div
                className="navs-wrap"
                style={{
                    height: heightStr
                }}
            >
                <ul
                    ref={saveRef("root")}
                    className="clearfix list"
                    style={{
                        overflow: "hidden"
                    }}
                >
                    {sliceIndex === null
                        ? renderData(data, saveRef, heightStr)
                        : renderData(showData, saveRef, heightStr)}
                    {sliceIndex === null ? null : (
                        <MoreContent
                            data={restData}
                            heightStr={heightStr}
                            saveRef={saveRef}
                            getRef={getRef}
                        />
                    )}
                </ul>
            </div>
        );
    }
    handler() {
        this.setState(
            {
                sliceIndex: null
            },
            () => {
                const { data = [] } = this.props;
                const ulWidth = this.props.getRef("root")["offsetWidth"];
                let liWidthCount = 0;
                data.some((item, index) => {
                    const key = item.key;
                    const width = this.props.getRef("" + key)["offsetWidth"];
                    let preLiWidthCount = liWidthCount;
                    liWidthCount += width;
                    if (liWidthCount > ulWidth) {
                        if (preLiWidthCount + 72 > ulWidth) {
                            this.setState({
                                sliceIndex: index - 1
                            });
                        } else {
                            this.setState({
                                sliceIndex: index
                            });
                        }
                    }
                    return liWidthCount > ulWidth;
                });
            }
        );
    }
    componentWillReceiveProps(nextProps) {
        let { data } = this.props;
        let nextData = nextProps.data;
        if (data !== nextData) {
            this.handler();
        }
    }
    componentDidMount() {
        this.debouncedResize = debounce(() => {
            this.handler();
        }, 100);
        this.resizeObserver = new ResizeObserver(this.debouncedResize);
        this.resizeObserver.observe(this.props.getRef("root"));
    }
    componentWillUnmount() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        if (this.debouncedResize && this.debouncedResize.cancel) {
            this.debouncedResize.cancel();
        }
    }
}
