import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieDetailsPageState from '../../store/MovieDetailsPage';
import { Loading, MiniLoading } from '../shared/Stateless';
import MovieTrailer from './MovieTrailer';

type MovieTrailerPanelProps =
    MovieDetailsPageState.MovieDetailsPageState        // ... state we've requested from the Redux store
    & typeof MovieDetailsPageState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class MovieTrailerPanel extends React.Component<MovieTrailerPanelProps, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            movie: {}
        }
    }

    componentDidMount() {
        //get movie trailer urls
        const { movie } = this.props;
        this.props.getMovieTrailers(movie);
        this.setState({ movie });
    }

    static getDerivedStateFromProps(nextProps: any, prevState: any) {
        const currentMovie = prevState.movie;
        const nextMovie = nextProps.movie;
        if (nextMovie.tconst !== currentMovie.tconst) {
            return {
                movie: nextMovie
            }
        }
    }

    componentDidUpdate(prevProps: any) {
        const prevMovie = prevProps.movie;
        const currentMovie = this.props.movie;
        if (currentMovie.tconst !== prevMovie.tconst) {
            this.props.getMovieTrailers(currentMovie);
        }
    }

    public render() {
        const {
            movieTrailers,
            isTrailersLoading,
        } = this.props;
        
        return (
            <div className="col-sm-12 movie-trailer-container">
                <div className="row container-title">
                    <span>Watch Trailer</span>
                </div>
                {isTrailersLoading
                    ? <div className="panel panel-default loader-panel"><MiniLoading /></div>
                    : <div className="panel-group" id="accordion">
                        { !movieTrailers
                            ? null
                            : movieTrailers.length == 0
                                ? <span> Trailer Not Found </span>
                                : movieTrailers.slice(0, 5).map((videoId: any, i: number) => (
                                    <div className="panel panel-default" key={i}>
                                        <div className="panel-heading">
                                            <h4 className="panel-title">
                                                <a data-toggle="collapse" className="collapsed" data-parent="#accordion" href={`#collapse${i + 1}`}>
                                                    Trailer #{i + 1}</a>
                                            </h4>
                                        </div>
                                        <div id={`collapse${i + 1}`} className="panel-collapse collapse">
                                            <div className="panel-body">
                                                <div className="youtube-videos-container">
                                                    <MovieTrailer
                                                        videoId={videoId}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                }
            </div>
        )
    }
}
export default connect(
    (state: ApplicationState) => state.movieDetails, // Selects which state properties are merged into the component's props
    MovieDetailsPageState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieTrailerPanel) as typeof MovieTrailerPanel;
