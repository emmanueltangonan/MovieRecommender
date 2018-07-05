import * as React from 'react';
import { SearchMovieConstants } from '../../constants/constants';

class SortByDropdown extends React.Component<{
    handleOnChange: any,
    sortBy: any
}, {}> {

    public render() {
        const criterion = SearchMovieConstants.SORTED_BY;
        const sortByOptionList = SearchMovieConstants.SORT_OPTION_LIST;
        const {
            handleOnChange,
            sortBy,
        } = this.props;
        return (
            <div className="sorted-by">
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle sort-by-btn borderless"
                        type="button"
                        id="sortBy"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        Sorted by
                            &nbsp;<strong>{sortBy}</strong>
                        &nbsp;<span><i className="fa fa-angle-down"></i></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="sortBy">
                        {sortByOptionList.map((sortByOption: string, i: number) => (
                            <li key={i}>
                                <a
                                    onClick={(e) => { handleOnChange(e, criterion) }}
                                    href="#">
                                    {sortByOption}
                                </a>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default SortByDropdown;