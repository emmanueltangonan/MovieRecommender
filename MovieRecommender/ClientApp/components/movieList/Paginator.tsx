import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import Pagination from "react-js-pagination";
import { PaginationConst } from '../../constants/constants';


type PaginatorProps =
    MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class Paginator extends React.Component<PaginatorProps, {}> {
    constructor(props: any) {
        super(props);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber: number) {
        const { movieSearchCriteria } = this.props;
        if (pageNumber != movieSearchCriteria.page) {
            let newMovieSearchCriteria = {
                ...movieSearchCriteria,
                page: pageNumber,
            }
            this.props.requestMovieList(newMovieSearchCriteria);
        }
    }

    public render() {
        const itemsCountPerPage = PaginationConst.ITEMS_COUNT_PER_PAGE;
        const pageRangeDisplayed = PaginationConst.PAGE_RANGE_DISPLAYED;
        const {
            movieSearchCriteria,
            totalMoviesSearched,
        } = this.props;

        let lastPage = Math.ceil(totalMoviesSearched / itemsCountPerPage);
        
        return (
            <div className="paginator">
                <Pagination
                    hideDisabled
                    activeLinkClass={PaginationConst.ACTIVE_LINK_CLASS}
                    prevPageText={PaginationConst.PREV_PAGE_TEXT}
                    nextPageText={PaginationConst.NEXT_PAGE_TEXT}
                    firstPageText={1}
                    lastPageText={lastPage}
                    activePage={movieSearchCriteria.page}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalMoviesSearched}
                    pageRangeDisplayed={pageRangeDisplayed}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(Paginator) as typeof Paginator;
