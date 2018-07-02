import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import MovieThumbnail from './MovieThumbnail';
import { FillingEmptySpaceDiv } from '../movies/Stateless';
import { Loading } from '../shared/Stateless';

type MovieListProps =
    MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class MovieList extends React.Component<MovieListProps, {}> {
    
    componentDidMount() {
        const { movies } = this.props;
        if (!movies.length) {
            this.props.requestMovieList(this.props.movieSearchCriteria);
        }
    }

    public render() {
        const { movies } = this.props;
        console.log(movies)
        return (
            <div className="col-sm-12 movie-list-container">
                {this.props.isLoading
                    ? <Loading />
                    :
                        <div className="movie-thumbnails-wrapper">
                            {movies.map((movie: any, i: number) => (
                                <MovieThumbnail key={i} movie={movie} />
                            ))
                            }
                            <FillingEmptySpaceDiv />
                            <FillingEmptySpaceDiv />
                            <FillingEmptySpaceDiv />
                            <FillingEmptySpaceDiv />
                            <FillingEmptySpaceDiv />
                            <FillingEmptySpaceDiv />
                        </div>
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieList) as typeof MovieList;
