import React from "react";
import PropTypes from "prop-types";
import {FaDownload, FaEdit, FaSearch, FaRegCommentDots} from "react-icons/fa";

import TableRow from "../table_row/TableRow";
import "./table.scss";
import TableHeader from "../table_header/TableHeader";
import {Columns} from "react-bulma-components/dist";
import Pagination from "../../pagination/Pagination";

class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: this.props.tableData,
            searchKey: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.tableData !== prevProps.tableData) {
            this.setState({tableData: this.props.tableData});
        }
    }

    filterTable = async searchKey => {
        if (!searchKey) {
            await this.setState({tableData: this.props.tableData});
        } else {
            let searchArray = [];

            for (let i = 0; i < this.props.tableData.length; i++) {
                let rowObject = this.props.tableData[i];
                let isKeyFound = false;
                for (var x in rowObject) {
                    if (
                        String(rowObject[x])
                            .toLowerCase()
                            .includes(searchKey.toLowerCase())
                    ) {
                        isKeyFound = true;
                    }
                }

                if (isKeyFound) {
                    searchArray.push(rowObject);
                }
            }

            await this.setState({tableData: searchArray});
        }
    };

    renderTableData = () => {
        const {tableData} = this.state;
        return (
            <tbody>
            <TableHeader headerObject={this.props.tableHeaderObject}/>
            {tableData.map((item, i) => {
                return (
                    <TableRow
                        key={i}
                        rowObject={item}
                        handleRowIsClicked={this.props.handleRowIsClicked}
                        handleRowEditIsClicked={this.props.handleRowEditIsClicked}
                        isRowEditingRequired={this.props.isRowEditingRequired}
                        isRowDuplicationRequired={this.props.isRowDuplicationRequired}
                        handleRowDuplicationIsClicked={
                            this.props.handleRowDuplicationIsClicked
                        }
                        isRowMoreDetailsRequired={this.props.isRowMoreDetailsRequired}
                        handleRowMoreDetailsIsClicked={
                            this.props.handleRowMoreDetailsIsClicked
                        }
                    />
                );
            })}
            </tbody>
        );
    };

    handleChange = event => {
        event.preventDefault();
        this.filterTable(event.target.value);
    };

    render() {
        const {isPaginationVisible} = this.props;
        return (
            <div class="panel panel-default">
                <div class="panel-heading">
                    <Columns>
                        <Columns.Column size="three-quarter">
                            <div>{this.props.tableTitle} </div>
                        </Columns.Column>

                        <Columns.Column size="one-quarter">

                            {/*Inner columns*/}
                            <Columns>
                                <Columns.Column size="one-half">
                                    <div className="edit-icon" id="second-utility-icon">
                                        <FaRegCommentDots
                                            onClick={() => {
                                                this.props.handleSecondUtilityIconClicked();
                                            }}
                                        />
                                    </div>
                                </Columns.Column>
                                <Columns.Column size="one-half">
                                    <div className="edit-icon" id="first-utility-icon">
                                        <FaEdit
                                            onClick={() => {
                                                this.props.addIconClicked();
                                            }}
                                        />
                                    </div>
                                </Columns.Column>
                            </Columns>
                        </Columns.Column>
                    </Columns>
                </div>
                <div class="panel-body">
                    <div className="input-group table-search-form">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={this.handleChange}
                            name="searchKey"
                        />
                        <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <FaSearch/>
              </button>
            </span>
                    </div>
                    <table
                        width="100%"
                        class="table table-striped table-bordered table-hover"
                        id="dataTables-example"
                    >
                        {this.renderTableData()}
                    </table>
                    {<Pagination/> && isPaginationVisible}
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    tableTitle: PropTypes.string,
    tableHeaderObject: PropTypes.object,
    tableData: PropTypes.arrayOf(PropTypes.object),
    addIconClicked: PropTypes.func,
    handleRowIsClicked: PropTypes.func,
    handleRowEditIsClicked: PropTypes.func,
    isRowEditingRequired: PropTypes.bool,
    handleRowDuplicationIsClicked: PropTypes.func,
    handleRowMoreDetailsIsClicked: PropTypes.func,
    isRowDuplicationRequired: PropTypes.bool,
    isRowMoreDetailsRequired: PropTypes.bool,
    isPaginationVisible: PropTypes.bool,
    handleSecondUtilityIconClicked: PropTypes.func,
};

Table.defaultProps = {
    tableTitle: "Table Title",
    addIconClicked: () => {
    },
    handleRowIsClicked: () => {
    },
    tableHeaderObject: {
        columnOne: "First Column",
        columnTwo: "Second Column",
        columnThree: "Third Column"
    },
    tableData: [
        {name: "silas", age: "15", home: "Kisumu"},
        {name: "Hazel", age: "14", home: "Kisumu"}
    ],
    handleRowEditIsClicked: () => {
    },
    isRowEditingRequired: false,
    handleRowDuplicationIsClicked: () => {
    },
    handleRowMoreDetailsIsClicked: () => {
    },
    isRowDuplicationRequired: false,
    isRowMoreDetailsRequired: false,
    isPaginationVisible: true,
    handleSecondUtilityIconClicked: () => {
    }
};

export default Table;
