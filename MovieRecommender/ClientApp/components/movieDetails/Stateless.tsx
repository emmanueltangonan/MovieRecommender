import * as React from 'react';

export const Rating: React.StatelessComponent<{ ratingObj: any, imgUrl: string, movie?: any }> =
    ({ ratingObj, imgUrl, movie }) => (
    <span>
        <img className="rating-logo" src={imgUrl} />
        &nbsp;
        { !movie
                ? ratingObj.Value
                : <span>
                    {movie.averageRating}/10
                    <span className="grey-out">&nbsp;({movie.numVotes} votes)</span>
                </span>
        }
        &ensp;
    </span>
)

export const PipeDivider: React.StatelessComponent<{}> = () => (
    <span>
        &nbsp;
        |
        &nbsp;
    </span>
)

