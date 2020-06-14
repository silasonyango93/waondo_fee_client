import React, {Component} from 'react';

import './Pagination.scss';
class Pagination extends Component {
    render() {
        return (
            <div className="pagination__main-body">
                <div className="col-sm-3 pagination__previous-tile">
                    Previous
                </div>
                <div className="col-sm-3 pagination__page-number-tiles">
                    1
                </div>
                <div className="col-sm-3 pagination__page-number-tiles">
                    2
                </div>
                <div className="col-sm-3 pagination__page-number-tiles">
                    3
                </div>
                <div className="col-sm-3 pagination__page-number-tiles">
                    4
                </div>
                <div className="col-sm-3 pagination__page-number-tiles">
                    5
                </div>
                <div className="col-sm-3 pagination__ellipsis-tiles">
                    ...
                </div>
                <div className="col-sm-3 pagination__double-pagenumber-tiles">
                    93
                </div>
                <div className="col-sm-3 pagination__next-tile">
                    Next
                </div>
            </div>
        );
    }
}

export default Pagination;
