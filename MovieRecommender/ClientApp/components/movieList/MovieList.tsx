import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import MovieThumbnail from './MovieThumbnail';
import { FillingEmptySpaceDiv } from './Stateless';
import { Loading } from '../shared/Stateless';
import BrowseCriteriaBox from './BrowseCriteriaBox';
import Paginator from './Paginator';
import DisplayOptions from './DisplayOptions';

type MovieListProps =
    MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class MovieList extends React.Component<MovieListProps, {}> {

    constructor(props: any) {
        super(props);
        this.renderMovies = this.renderMovies.bind(this);
    }

    componentDidMount() {
        const { movies } = this.props;
        if (!movies.length) {
            this.props.requestMovieList(this.props.movieSearchCriteria);
        }
    }

    renderMovies(movies: any, totalMoviesSearched: any) {
        console.log(totalMoviesSearched)
        if (totalMoviesSearched != null && totalMoviesSearched == 0) {
            return <div>Whoops! No movies matched those criteria...</div> 
        }else if (movies && movies.length > 0) {
            return (
                movies.map((movie: any, i: number) => (
                    <MovieThumbnail key={i} movie={movie} />
                ))
            );
        }
    }

    public render() {
        const { movies, error, totalMoviesSearched } = this.props;
        
        return (
            
            <div className="col-sm-12 movie-list-container">
                <BrowseCriteriaBox />
                <DisplayOptions />
                <div className="movie-thumbnails-wrapper">
                    {this.props.isLoading
                        ? <Loading />
                        : this.renderMovies(movies, totalMoviesSearched)
                    }
                    <FillingEmptySpaceDiv />
                    <FillingEmptySpaceDiv />
                    <FillingEmptySpaceDiv />
                    <FillingEmptySpaceDiv />
                    <FillingEmptySpaceDiv />
                    <FillingEmptySpaceDiv />
                </div>
                <Paginator />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieList) as typeof MovieList;
