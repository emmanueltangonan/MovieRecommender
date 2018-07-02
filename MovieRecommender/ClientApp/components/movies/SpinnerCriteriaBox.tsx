import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from './MovieDetails';
import GenreDropDown from './GenreDropDown';
import YearDropDown from './YearDropDown';
import ImdbRatingDropDown from './ImdbRatingDropDown'

type SpinnerCriteriaBoxProps = any
    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class SpinnerCriteriaBox extends React.Component<SpinnerCriteriaBoxProps, {}> {
    
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
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(SpinnerCriteriaBox) as typeof SpinnerCriteriaBox;
