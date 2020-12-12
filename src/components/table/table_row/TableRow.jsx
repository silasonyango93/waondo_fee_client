import React from 'react';
import PropTypes from "prop-types";
import {FaEdit,FaRegCopy,FaRegFileAlt} from "react-icons/fa";


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

        if (this.props.isRowMoreDetailsRequired) {
            columns.push(<td>
                <div className="edit-icon">
                    <FaRegFileAlt
                        onClick={() => {
                            this.props.handleRowMoreDetailsIsClicked(this.props.rowObject['payload']);
                        }}
                    />
                </div>
            </td>);
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

        if (this.props.isRowDuplicationRequired) {
            columns.push(<td>
                <div className="edit-icon">
                    <FaRegCopy
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
    handleRowDuplicationIsClicked: PropTypes.func,
    handleRowMoreDetailsIsClicked: PropTypes.func,
    isRowEditingRequired: PropTypes.bool,
    isRowDuplicationRequired: PropTypes.bool,
    isRowMoreDetailsRequired: PropTypes.bool

};

TableRow.defaultProps = {
    handleRowIsClicked: () => {
    },
    handleRowEditIsClicked: () => {
    },
    handleRowDuplicationIsClicked: () => {
    },
    handleRowMoreDetailsIsClicked: () => {
    },
    isRowEditingRequired: false,
    isRowDuplicationRequired: false,
    isRowMoreDetailsRequired: false
};

export default TableRow;
