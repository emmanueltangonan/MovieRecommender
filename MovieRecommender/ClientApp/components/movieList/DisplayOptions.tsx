import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import SortByDropdown from './SortByDropdown';
import OrderDropdown from './OrderDropdown';
import { SearchMovieConstants, SharedConstants } from '../../constants/constants';

type DisplayOptionsProps = any
    & MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class DisplayOptions extends React.Component<DisplayOptionsProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(e: any, criterion: string) {
        e.preventDefault();
        let value = e.currentTarget.textContent;
        switch (criterion) {
            case SearchMovieConstants.SORTED_BY:
                break;
            case SearchMovieConstants.ORDER:
                break;
        }
        const { movieSearchCriteria } = this.props;
        const newCriteria = {
            ...movieSearchCriteria,
            [criterion]: value
        }
        this.props.setBrowseSearchCriteria(newCriteria);
        
        this.props.requestMovieList(newCriteria);
    }

    public render() {
        const { movieSearchCriteria, totalMoviesSearched } = this.props;
        const { sortBy, order } = movieSearchCriteria;
        return (
            <div className="row display-options">
                <div className="result-count">
                    {totalMoviesSearched == null
                        ? null
                        : <span>
                            <strong>{totalMoviesSearched.toLocaleString()}</strong>
                            &nbsp;movies found
                        </span>
                    }
                </div>
                <OrderDropdown
                    handleOnChange={this.handleOnChange}
                    order={order}
                />
                <SortByDropdown
                    handleOnChange={this.handleOnChange}
                    sortBy={sortBy}
                />
                
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(DisplayOptions) as typeof DisplayOptions;
