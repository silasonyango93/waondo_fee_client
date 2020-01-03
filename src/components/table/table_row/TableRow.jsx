import React from 'react';
import PropTypes from "prop-types";



class TableRow extends React.Component {

    state = { columns: [], rowObject: this.props.rowObject};

    componentDidMount() {
        this.prepareRow();
    }

    prepareRow = ()=> {
        var columns = [];
        for (var x in this.state.rowObject) {
            columns.push(<td>{this.state.rowObject[x]}</td>);
        }

        this.setState({columns});
    };

    render() {
        return (

            <tr>{this.state.columns}</tr>


        );
    }
}

TableRow.propTypes = {
    rowObject: PropTypes.object.isRequired
};
export default TableRow;
