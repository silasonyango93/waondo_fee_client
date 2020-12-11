import React from 'react';
import PropTypes from "prop-types";
import {FaEdit} from "react-icons/fa";


class TableRow extends React.Component {

    state = {columns: [], rowObject: {}};

    async componentDidMount() {
        await this.setState({rowObject: this.props.rowObject});
        this.prepareRow();
    }

    prepareRow = () => {
        var columns = [];
        for (var x in this.props.rowObject) {
            if (x !== 'payload') {
                columns.push(<td>{this.props.rowObject[x]}</td>);
            }
        }

        if (this.props.isRowEditingRequired) {
            columns.push(<td>
                <div className="edit-icon">
                    <FaEdit
                        onClick={() => {
                            this.props.handleRowEditIsClicked(this.props.rowObject['payload']);
                        }}
                    />
                </div>
            </td>);
        }

        return columns;
    };

    render() {

        const {
            rowObject
        } = this.props;

        return (

            <tr style={{cursor: 'pointer'}} onClick={() => {
                this.props.handleRowIsClicked(rowObject);
            }}>{this.prepareRow()}</tr>

        );
    }
}

TableRow.propTypes = {
    rowObject: PropTypes.object.isRequired,
    handleRowIsClicked: PropTypes.func,
    handleRowEditIsClicked: PropTypes.func,
    isRowEditingRequired: PropTypes.bool

};

TableRow.defaultProps = {
    handleRowIsClicked: () => {
    },
    handleRowEditIsClicked: () => {
    },
    isRowEditingRequired: false
};

export default TableRow;
