import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieDetailsPageState from '../../store/MovieDetailsPage';
import MovieDetails from './MovieDetails';
import { Loading } from '../shared/Stateless';
import MovieTrailerPanel from './MovieTrailerPanel';

type MovieDetailsPageProps =
    MovieDetailsPageState.MovieDetailsPageState        // ... state we've requested from the Redux store
    & typeof MovieDetailsPageState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ tconst: string }>; // ... plus incoming routing parameters

class MovieDetailsPage extends React.Component<MovieDetailsPageProps, {}> {

    componentDidMount() {
        const imdbData = this.props.location.state && this.props.location.state.imdbData;
        //console.log(imdbData)
        let tconst = this.props.match.params.tconst || 0;
        tconst && this.props.getMovieDetails(tconst, imdbData);
    }

    public render() {
        const {
            selectedMovie,
            isLoading,
            error
        } = this.props;
        //console.log(selectedMovie)
        return (
            <div>
                <div className="col-sm-12 movie-detail-page-container">
                    {!selectedMovie
                        ? <Loading />
                        : <MovieDetails
                                movie={selectedMovie}
                                isLoading={isLoading}
                                error={error}
                           />
                    }
                </div>
                {   !this.props.isLoading &&
                    selectedMovie
                    &&
                    <MovieTrailerPanel
                        movie={selectedMovie}
                    />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieDetails, // Selects which state properties are merged into the component's props
    MovieDetailsPageState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieDetailsPage) as typeof MovieDetailsPage;
