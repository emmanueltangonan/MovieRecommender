import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import GenreDropDown from '../movies/GenreDropDown';
import YearDropDown from '../movies/YearDropDown';
import ImdbRatingDropDown from '../movies/ImdbRatingDropDown'

type BrowseCriteriaBoxProps = any
    & MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class BrowseCriteriaBox extends React.Component<BrowseCriteriaBoxProps, {}> {

    public render() {
        const title = 'Get Random Movie';
        return (
            <div className="row spinner-criteria">
                <div className="row spinner-criteria-elem-wrapper">
                    <div className="col-sm-3">
                        <GenreDropDown />
                    </div>
                    <div className="col-sm-3">
                        <YearDropDown />
                    </div>
                    <div className="col-sm-3">
                        <ImdbRatingDropDown />
                    </div>
                    <div className="col-sm-3">
                        <button
                            className="btn btn-success spinner-button pull-right"
                            onClick={() => this.props.requestRandomMovie(this.props.movieSearchCriteria)}
                            title={title}
                        > {title} </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(BrowseCriteriaBox) as typeof BrowseCriteriaBox;
