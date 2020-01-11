import React from "react";
import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

import TableRow from "../table_row/TableRow";
import "./table.scss";
import TableHeader from "../table_header/TableHeader";
import { Columns } from "react-bulma-components/dist";
class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tableData: this.props.tableData };
  }

  componentDidUpdate(prevProps) {
    if (this.props.tableData !== prevProps.tableData) {
      this.setState({ tableData: this.props.tableData });
    }
  }

  render() {
    return (
      <div class="panel panel-default">
        <div class="panel-heading">
          <Columns>
            <Columns.Column size="three-quarter">
              <div>{this.props.tableTitle} </div>
            </Columns.Column>

            <Columns.Column size="one-quarter">
              <div className="edit-icon">
                <FaEdit
                  onClick={() => {
                    this.props.addIconClicked();
                  }}
                />
              </div>
            </Columns.Column>
          </Columns>
        </div>
        <div class="panel-body">
          <table
            width="100%"
            class="table table-striped table-bordered table-hover"
            id="dataTables-example"
          >
            <tbody>
              <TableHeader headerObject={this.props.tableHeaderObject} />
              {this.state.tableData.map((item, i) => (
                <TableRow key={i} rowObject={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Table.propTypes = {
  tableTitle: PropTypes.string,
  tableHeaderObject: PropTypes.object,
  tableData: PropTypes.arrayOf(PropTypes.object),
  addIconClicked: PropTypes.func
};

Table.defaultProps = {
  tableTitle: "Table Title",
  addIconClicked: () => {},
  tableHeaderObject: {
    columnOne: "First Column",
    columnTwo: "Second Column",
    columnThree: "Third Column"
  },
  tableData: [
    { name: "silas", age: "15", home: "Kisumu" },
    { name: "Hazel", age: "14", home: "Kisumu" }
  ]
};

export default Table;
