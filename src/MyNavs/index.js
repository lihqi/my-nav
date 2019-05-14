import React, { Component } from "react";
import SaveRef from "./SaveRef";
import Navs from "./Navs";
export default class Nav extends Component {
    render() {
        let { data } = this.props;
        return (
            <SaveRef>
                {(saveRef, getRef) => (
                    <Navs
                        saveRef={saveRef}
                        getRef={getRef}
                        height={60}
                        data={data}
                    />
                )}
            </SaveRef>
        );
    }
}
