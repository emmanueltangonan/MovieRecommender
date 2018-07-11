import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieDetailsPageState from '../../store/MovieDetailsPage';
import { Loading } from '../shared/Stateless';
import YouTube from 'react-youtube';
import { Dimensions } from '../../constants/constants';

type MovieTrailerProps =
    MovieDetailsPageState.MovieDetailsPageState        // ... state we've requested from the Redux store
    & typeof MovieDetailsPageState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class MovieTrailer extends React.Component<MovieTrailerProps, {}> {
    constructor(props: any) {
        super(props);
        this._onReady = this._onReady.bind(this);
        //this._onPlay = this._onPlay.bind(this);
    }

    _onReady(event: any) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    //_onPlay(videoId: any) {
    //    window.location.href = `https://www.youtube.com/embed/${videoId}?rel=0&wmode=transparent&border=0&autoplay=1&iv_load_policy=3`;
    //}

    public render() {
        const { videoId } = this.props;
        const opts = {
            playerVars: {
                autoplay: 0,
                rel: 0,
                modestbranding: 1,
            }
        }
        return (
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={this._onReady}
                //onPlay={() => this._onPlay(videoId)}
            />
        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieDetails, // Selects which state properties are merged into the component's props
    MovieDetailsPageState.actionCreators                 // Selects which action creators are merged into the component's props
)(MovieTrailer) as typeof MovieTrailer;
