import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieDetailsPageState from '../../store/MovieDetailsPage';
import MovieDetails from '../movies/MovieDetails';
import { Loading } from '../shared/Stateless';

type MovieDetailsPageProps =
    MovieDetailsPageState.MovieDetailsPageState        // ... state we've requested from the Redux store
    & typeof MovieDetailsPageState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ tconst: string }>; // ... plus incoming routing parameters

class MovieDetailsPage extends React.Component<MovieDetailsPageProps, {}> {

    componentDidMount() {
        let tconst = this.props.match.params.tconst || 0;
        tconst && this.props.getMovieDetails(tconst);
    }

    //componentWillReceiveProps(nextProps: any) {
    //    let tconst = nextProps.match.params.tconst || 0;
    //    tconst && this.props.getMovieDetails(tconst);
    //    console.log(nextProps)
    //}

    public render() {
        //const tconst = this.props.match.params.tconst
        //if (tconst) {
        //    console.log()
        //    this.props.getMovieDetails(tconst);
        //}
        const {
            selectedMovie,
            isLoading,
            error
        } = this.props;
        
        return (
            <div className="col-sm-12 movie-detail-page-container">
                {!selectedMovie
                    ? <Loading />
                    : <MovieDetails
                            movie={selectedMovie}
                            imdbData={selectedMovie.imdbData}
                            isLoading={isLoading}
                            error={error}
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
