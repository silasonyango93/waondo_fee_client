import React from 'react';
import PropTypes from "prop-types";



class TableRow extends React.Component {

    state = { columns: [], rowObject: {}};

    async componentDidMount() {
        await this.setState({rowObject: this.props.rowObject});
        this.prepareRow();
    }

    prepareRow = ()=> {
        var columns = [];
        for (var x in this.props.rowObject) {
            columns.push(<td>{this.props.rowObject[x]}</td>);
        }

        return columns;
    };

    render() {

        const {
            rowObject
        } = this.props;

        return (

            <tr style={{cursor: 'pointer'}} onClick={()=>{this.props.handleRowIsClicked(rowObject);}}>{this.prepareRow()}</tr>

        );
    }
}

TableRow.propTypes = {
    rowObject: PropTypes.object.isRequired,
    handleRowIsClicked: PropTypes.func
};

TableRow.defaultProps = {
    handleRowIsClicked: ()=>{}
};

export default TableRow;
