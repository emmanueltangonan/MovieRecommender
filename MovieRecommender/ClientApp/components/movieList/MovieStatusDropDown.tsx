import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import { SearchMovieConstants, SharedConstants } from '../../constants/constants';

class MovieStatusDropDown extends React.Component<{
    handleOnChange: any,
    status: any
}, {}> {

    public render() {
        const criterion = SearchMovieConstants.STATUS;
        const {
            handleOnChange,
            status,
        } = this.props;
        const statusList = SearchMovieConstants.STATUS_LIST;
        const title = status == SharedConstants.ALL ? 'All Movies' : 'All ' + status;
        return (
            <span>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        title={title}
                    >
                        {title}
                        &nbsp;
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        {statusList.map((status: string, i: number) => (
                            <li key={i}>
                                <a
                                    onClick={(e) => { handleOnChange(e, criterion) }}
                                    href="#">
                                    {status}
                                </a>
                            </li>
                        ))
                        }

                    </ul>
                </div>
            </span>
        )
    }
}
export default MovieStatusDropDown;
