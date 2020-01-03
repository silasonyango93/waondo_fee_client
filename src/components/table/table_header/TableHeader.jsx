import React from 'react';
import PropTypes from "prop-types";



class TableHeader extends React.Component {

    state = { columns: [], rowObject: this.props.headerObject};

    componentDidMount() {
        this.prepareRow();
    }

    prepareRow = ()=> {
        var columns = [];
        for (var x in this.state.rowObject) {
            columns.push(<th>{this.state.rowObject[x]}</th>);
        }

        this.setState({columns});
    };

    render() {
        return (

            <tr>{this.state.columns}</tr>


        );
    }
}

TableHeader.propTypes = {
    headerObject: PropTypes.object.isRequired
};
export default TableHeader;
