import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Rating, PipeDivider } from './Stateless';
import Moment from 'react-moment';
import { Loading } from '../shared/Stateless';
import MovieFlagButtons from './MovieFlagButtons';
import { Assets } from '../../constants/constants';

export default class MovieDetails extends React.Component<{
    movie: any, isLoading: boolean, error: any
}, {}> {

    public render() {
        const {
            movie,
            isLoading,
            error
        } = this.props;
        const imdbData = movie && movie.imdbData;
        const genres = movie && movie.genres && movie.genres.replace(/,/g, ', ');
        const imdbLogo = Assets.IMDB_LOGO;
        const rottenTomLogo = Assets.ROTTEN_TOM_LOGO;
        const metacriticLogo = Assets.METACRITIC_LOGO;
        //console.log(imdbData)
        return (
            <div className="col-sm-12 movie-details">
                {error
                    ? <div> {error} </div>
                    : isLoading || !movie || !imdbData
                        ? <Loading />
                    :
                    <div>
                        <div className="col-sm-4 img-container">
                            <img src={imdbData.Poster} alt={movie.primaryTitle} />
                        </div>
                        <div className="col-sm-8 movie-details-right">
                            <div className="col-sm-9 movie-title-wrapper">
                                <div className="col-sm-12 movie-title-div">
                                    <h1 className="movie-title">
                                        {movie.primaryTitle}
                                        &nbsp;
                                        ({imdbData.Year})
                                    </h1>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 movie-quick-details">
                                        <span className="grey-out">{imdbData.Rated}</span>
                                        <PipeDivider />
                                        <span className="grey-out">{imdbData.Runtime}</span>
                                        <PipeDivider />
                                        <span className="grey-out">{genres}</span>
                                        <PipeDivider />
                                        <span className="grey-out">
                                            {imdbData.Released}
                                            {/*<Moment date={imdbData.released}
                                                format="DD MMM YYYY"
                                            />*/}
                                            &nbsp;
                                        ({imdbData.Country})
                                        </span>
                                    </div>
                                </div>
                                {
                                    !imdbData.Ratings
                                        ? null
                                        :
                                        <div className="row ratings-row">
                                            {imdbData.Ratings.map(
                                                (obj: any, i: any) => (
                                                    <span key={i}>
                                                        {obj.Source == 'Internet Movie Database' ?
                                                            <Rating ratingObj={obj} movie={movie} imgUrl={imdbLogo} />
                                                            : null
                                                        }
                                                        {obj.Source == 'Rotten Tomatoes' ?
                                                            <Rating ratingObj={obj} imgUrl={rottenTomLogo} />
                                                            : null
                                                        }
                                                        {obj.Source == 'Metacritic' ?
                                                            <Rating ratingObj={obj} imgUrl={metacriticLogo} />
                                                            : null
                                                        }
                                                    </span>
                                                ))
                                            }
                                        </div>
                                }
                            </div>
                            <MovieFlagButtons/>
                            <div className="col-sm-12 other-details">
                                <span>
                                    <strong>Language</strong>
                                    <p className="movie-details-text">{imdbData.Language}</p>
                                </span>
                                {movie.originalTitle == movie.primaryTitle
                                    ? null
                                    :
                                    <span>
                                        <strong>Original Title</strong>
                                        <p className="movie-details-text">{movie.originalTitle}</p>
                                    </span>
                                }
                                <span>
                                    <strong>Plot</strong>
                                    <p className="movie-details-text">{imdbData.Plot}</p>
                                </span>
                                <span>
                                    <strong>Cast</strong>
                                    <p className="movie-details-text">{imdbData.Actors}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                }
            </div>
                

        )
    }
}
