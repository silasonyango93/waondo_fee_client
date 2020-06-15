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

        const {
            rowObject
        } = this.props;

        return (

            <tr style={{cursor: 'pointer'}} onClick={()=>{this.props.handleRowIsClicked(rowObject);}}>{this.state.columns}</tr>


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
