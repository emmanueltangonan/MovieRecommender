import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from './MovieDetails';
import SpinnerCriteriaBox from './SpinnerCriteriaBox';
import { Loading } from '../shared/Stateless';

type RandomMovieProps =
    MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class RandomMovie extends React.Component<RandomMovieProps, {}> {

    componentDidMount() {
        this.props.requestRandomMovie(this.props.movieSearchCriteria);
        console.log(this.props)
    }

    public render() {
        const movie = this.props.randomMovie;
        const imdbData = this.props.randomMovie.imdbData;
        return (
            <div className="col-sm-12 sugg-movie-container">
                <SpinnerCriteriaBox />
                {this.props.error
                    ? <div> {this.props.error} </div>
                    : <MovieDetails
                        movie={movie}
                        imdbData={imdbData}
                        isLoading={this.props.isLoading}
                        error={this.props.error}
                      />
                }
            </div>
            
        )
    }
}

export default connect(
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(RandomMovie) as typeof RandomMovie;
