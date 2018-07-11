import * as React from 'react';
import { Link, RouteComponentProps, withRouter  } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import * as imdb from 'imdb-api';
import { Assets, ApiConstants, ObjPropertyConstants } from '../../constants/constants';
import Error from '../../constants/errorConstants';
import axios from 'axios';

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
            movie: null,
            imdbData: null,
            error: '',
            [ObjPropertyConstants.IS_SEEN_BTN_HOVERED]: false,
            [ObjPropertyConstants.IS_UNINTERESTED_BTN_HOVERED]: false,
            _isLoading: false
        }
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.getThumbnailStyle = this.getThumbnailStyle.bind(this);
        this.getMoviePoster = this.getMoviePoster.bind(this);
        this.handleActionButtonMouseEnter = this.handleActionButtonMouseEnter.bind(this);
        this.handleActionButtonMouseLeave = this.handleActionButtonMouseLeave.bind(this);
    }

    componentDidMount() {
        const { movie } = this.props;
        this.getMoviePoster(movie.tconst);
        this._ismounted = true;
        this.setState({ _isLoading: true, movie});
        this.getThumbnailStyle(false);
    }
 
    componentWillUnmount() {
        this._ismounted = false;
    }

    static getDerivedStateFromProps(nextProps:any, prevState:any) {
        const { imdbData } = prevState;
        const { movie } = nextProps;
        if (imdbData.imdbID !== movie.tconst) {
            return {
                _isLoading: true,
                movie
            }
        }
    }

    componentDidUpdate() {
        const { imdbData } = this.state;
        const { movie } = this.props;
        if (!imdbData || imdbData.imdbID !== movie.tconst) {
            this.getMoviePoster(movie.tconst);
        }
    }

    //componentWillReceiveProps(nextprops: any) {
    //    const { movie } = nextprops;
    //    this._isLoading = true;
    //    this.getMoviePoster(movie.tconst);
    //    //const { isMovieThumbnailHovered } = this.state;
    //    //if (movie && movie.imdbData) {
    //    //    this.getThumbnailStyle(isMovieThumbnailHovered);
    //    //}
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

    handleActionButtonMouseEnter(btnStatePropName: string) {
        this.setState({
            [btnStatePropName]: true
        });
    }

    handleActionButtonMouseLeave(btnStatePropName: string) {
        this.setState({
            [btnStatePropName]: false
        });
    }

    getThumbnailStyle(isHovered: boolean) {
        const { imdbData, _isLoading } = this.state;
        let movieThumbnailStyle = {};
        if (!imdbData) {
            var loadingUrl = Assets.LOADING_GIF;
            movieThumbnailStyle = {
                background: `linear-gradient(to top left, transparent 50%, rgba(51, 51, 51, 0.7) 51%) 0 0/100% 30px no-repeat, url(${loadingUrl}) center/cover`
            }
        } else {
            this.setState({ _isLoading: false });
            if (isHovered) {
                movieThumbnailStyle = {
                    background: `linear-gradient(to bottom, rgba(51, 51, 51, 0.7) 0%, rgba(51, 51, 51, 0.7) 100%) 0 0/100% 100% no-repeat, url(${imdbData.Poster}) center/cover`,
                }
            } else {
                movieThumbnailStyle = {
                    background: `linear-gradient(to top left, transparent 50%, rgba(51, 51, 51, 0.7) 51%) 0 0/100% 30px no-repeat, url(${imdbData.Poster}) center/cover`
                }
            }
        }
        this.setState({
            movieThumbnailStyle
        });
    }

    getMoviePoster(tconst: string) {
        const apiKey = ApiConstants.API_KEY;
        const baseUrl = ApiConstants.API_BASE_URL;
        const timeout = ApiConstants.API_CALL_TIMEOUT;
        const httpClient = axios.create();
        httpClient.defaults.timeout = timeout;
        httpClient.get(`${baseUrl}${apiKey}&i=${tconst}`)
            .then((res) => {
                //console.log(res)
                if (this._ismounted) {
                    this.setState({ imdbData: res.data });
                    const { isMovieThumbnailHovered } = this.state;
                    this.getThumbnailStyle(isMovieThumbnailHovered);
                }
            })
            .catch((error) => {
                if (error.code === 'ECONNABORTED') {
                    console.log('Connection timed out... ', error)
                    this._ismounted && this.setState({ error: 'Connection timed out... ' });
                }
                else
                    this._ismounted && this.setState({ error: Error.ERROR_102 });
            });
        //cli.get({ 'id': tconst })
        //    .then((imdbData: any) => {
        //        if (this._ismounted) {
        //            this.setState({ imdbData });
        //            const { isMovieThumbnailHovered } = this.state;
        //            this.getThumbnailStyle(isMovieThumbnailHovered);
        //        }
        //    }).catch((error) => {
        //        this._ismounted && this.setState({ error: Error.ERROR_102 });
        //    });
    }

    public render() {
        const seenBtnProp = ObjPropertyConstants.IS_SEEN_BTN_HOVERED;
        const uninterestedBtnProp = ObjPropertyConstants.IS_UNINTERESTED_BTN_HOVERED;
        const { movie } = this.props;
        const {
            movieThumbnailStyle,
            isMovieThumbnailHovered,
            isSeenBtnHovered,
            isUninterestedBtnHovered,
            imdbData,
        } = this.state;
        const title = movie && movie.primaryTitle + ' (' + movie.startYear + ')';
        return (
            !movie ? null :
            <div className="movie-thumbnail"
                style={movieThumbnailStyle}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseOver={this.handleMouseEnter}
                title={ title }
                    onClick={() => this.props.history.push({
                            pathname: `/movie/${movie.tconst}`,
                            state: { imdbData: imdbData }
                        })}
            >
                <div className="rating-holder">
                        <img src={Assets.RATING_STAR} />
                        &nbsp;
                    <span className="rating-holder-text">
                        <strong>
                            {movie.averageRating}
                            <span className="rating-suffix">/10</span>
                        </strong>
                    </span>
                </div>
                <div className="movie-thumbnail-body">
                    <div className="action-buttons-holder">
                        <button
                            className={isMovieThumbnailHovered ? 'seen-btn' : 'hide-button seen-btn'}
                            onMouseEnter={() => this.handleActionButtonMouseEnter(seenBtnProp)}
                            onMouseLeave={() => this.handleActionButtonMouseLeave(seenBtnProp)}
                            title="Mark As Watched"
                        >
                            {isSeenBtnHovered
                                ? <span><i className="fa fa-check"></i>&nbsp;Seen It</span>
                                : <i className="fa fa-check"></i>
                            }
                        </button>
                    </div>
                    <div className="action-buttons-holder">
                        <button
                            className={isMovieThumbnailHovered ? 'uninterested-btn' : 'hide-button uninterested-btn'}
                            onMouseEnter={() => this.handleActionButtonMouseEnter(uninterestedBtnProp)}
                            onMouseLeave={() => this.handleActionButtonMouseLeave(uninterestedBtnProp)}
                            title="Hide From Future Searches"
                        >
                            {isUninterestedBtnHovered
                                ? <span><i className="fa fa-remove"></i>&nbsp;Not Interested</span>
                                : <i className="fa fa-remove"></i>
                            }
                    </button>
                    </div>
                </div>
                    <div className="title-holder">{ title }</div>
            </div>
        )
    }
}

export default withRouter<MovieThumbnailProps>(connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieThumbnail)) as typeof MovieThumbnail;
