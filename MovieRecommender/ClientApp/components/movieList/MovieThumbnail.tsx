import * as React from 'react';
import { Link, RouteComponentProps, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import * as imdb from 'imdb-api';

type MovieThumbnailProps = any 
    & MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class MovieThumbnail extends React.Component<MovieThumbnailProps, any> {
   _ismounted = false;
    constructor(props: any) {
        super(props);
        this.state = {
            isMovieThumbnailHovered: false,
            movieThumbnailStyle: {},
            imdbData: null,
            error: ''
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getThumbnailStyle = this.getThumbnailStyle.bind(this);
        this.getMoviePoster = this.getMoviePoster.bind(this);
    }

    componentDidMount() {
        //this.getThumbnailStyle(false);
        const { movie } = this.props;
        this.getMoviePoster(movie.tconst);
        this._ismounted = true;
    }
 
    componentWillUnmount() {
        this._ismounted = false;
    }

    //componentWillReceiveProps(nextprops: any) {
    //    const { movie } = nextprops;
    //    const { isMovieThumbnailHovered } = this.state;
    //    if (movie && movie.imdbData) {
    //        this.getThumbnailStyle(isMovieThumbnailHovered, movie);
    //            //{
    //                //background: `linear-gradient(to top left, transparent 50%, rgba(51, 51, 51, 0.7) 51%) 0 0/100% 30px no-repeat, url(${movie.imdbData.poster}) center/cover`
    //                //background: `linear-gradient(to bottom, rgba(51, 51, 51, 0.7) 0%, rgba(51, 51, 51, 0.7) 100%) 0 0/100% 100% no-repeat, url(${movie.imdbData.poster}) center/cover`
    //            //}
            
    //    }
    //}

    handleMouseEnter() {
        this.setState({
            isMovieThumbnailHovered: true
        });
        const { imdbData } = this.state;
        if (!imdbData) {
            const { movie } = this.props;
            this.getMoviePoster(movie.tconst);
        }
        this.getThumbnailStyle(true);
    }

    handleMouseLeave() {
        this.setState({
            isMovieThumbnailHovered: false
        });
        this.getThumbnailStyle(false);
    }

    getThumbnailStyle(isHovered: boolean) {
        const { imdbData } = this.state;
        if (!imdbData) return;
        let movieThumbnailStyle = {};
        if (isHovered) {
            movieThumbnailStyle = {
               background: `linear-gradient(to bottom, rgba(51, 51, 51, 0.7) 0%, rgba(51, 51, 51, 0.7) 100%) 0 0/100% 100% no-repeat, url(${imdbData.poster}) center/cover`,     
            }
        } else {
            movieThumbnailStyle = {
               background: `linear-gradient(to top left, transparent 50%, rgba(51, 51, 51, 0.7) 51%) 0 0/100% 30px no-repeat, url(${imdbData.poster}) center/cover`
            }
        }
        this.setState({
            movieThumbnailStyle
        });
    }

    getMoviePoster(tconst: string) {
        const cli = new imdb.Client({ apiKey: '5330a888', timeout: 3000 });
        console.log('requesting movie poster');
        cli.get({ 'id': tconst })
            .then((imdbData: any) => {
                if (this._ismounted) {
                    this.setState({ imdbData: imdbData });
                    const { isMovieThumbnailHovered } = this.state;
                    this.getThumbnailStyle(isMovieThumbnailHovered);
                }
            }).catch(() => {
                console.log('Error in fetching movie poster.')
                if (this._ismounted) {
                    this.setState({ error: 'Error in fetching imdb data.' });
                }
            });
    }

    public render() {
        const { movie } = this.props;
        const { imdbData } = this.state;
        const {
            movieThumbnailStyle,
            isMovieThumbnailHovered
        } = this.state;
        return (
            !movie ? null :
            <div className="movie-thumbnail"
                style={movieThumbnailStyle}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseOver={this.handleMouseEnter}
                onClick={() => this.props.history.push(`/movie/${movie.tconst}`)}
            >
                <div className="rating-holder">
                        <img src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/256/Actions-rating-icon.png" />
                        &nbsp;
                    <span className="rating-holder-text"><strong>{movie.averageRating}/10</strong></span>
                </div>
                <div className="movie-thumbnail-body">
                    <div className="action-buttons-holder">
                        <button className={isMovieThumbnailHovered ? '' : 'hide-button'}
                                onClick={() => this.props.history.push(`/movie/${movie.tconst}`)}
                        >S</button>
                        <button className={isMovieThumbnailHovered ? '' : 'hide-button'} >D</button>
                    </div>
                </div>
                <div className="title-holder">{ movie.primaryTitle }</div>
            </div>
        )
    }
}

export default withRouter<MovieThumbnailProps>(connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieThumbnail)) as typeof MovieThumbnail;
