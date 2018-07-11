import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from '../movieDetails/MovieDetails';
import SpinnerCriteriaBox from './SpinnerCriteriaBox';
import { Loading } from '../shared/Stateless';
import MovieTrailerPanel from '../movieDetails/MovieTrailerPanel';
import { SharedConstants } from '../../constants/constants';
import axios from 'axios';

type RandomMovieProps =
    MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class RandomMovie extends React.Component<RandomMovieProps, {}> {

    componentDidMount() {
        this.props.requestRandomMovie(this.props.movieSearchCriteria);
    }

    public render() {
        const movie = this.props.randomMovie;
        console.log(movie)
        return (
            <div>
                <div className="col-sm-12 sugg-movie-container">
                    <SpinnerCriteriaBox />
                    <MovieDetails
                        movie={movie}
                        isLoading={this.props.isLoading}
                        error={this.props.error}
                    />
                </div>
                {
                    !this.props.isLoading && movie && <MovieTrailerPanel movie={movie} />
                }
            </div>
            
        )
    }
}

export default connect(
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(RandomMovie) as typeof RandomMovie;
