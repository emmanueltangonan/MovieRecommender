import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from './MovieDetails';

type ImdbRatingDropDownProps = any
    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class ImdbRatingDropDown extends React.Component<ImdbRatingDropDownProps, {}> {

    handleOnChange(e: any) {
        e.preventDefault();
        let rating = e.currentTarget.textContent;
        rating = rating == 'All' ? 0 : rating.substring(0, rating.length - 1);
        //this.props.setRating(rating);
        this.props.setSpinnerCriteria({
            ...this.props.movieSearchCriteria,
            rating: rating
        });
    }

    public render() {
        const rating = this.props.movieSearchCriteria.rating
        const range = 5;
        const ratings = Array.from(new Array(range), (val, index) => 9 - index);
        const title = rating == 0 ? 'IMDB Rating: All' : !rating ? 'IMDB Rating' : 'IMDB Rating: ' + rating + '+';
        return (
            <span>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        title={title}
                    >
                        {title}
                        &nbsp; 
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a onClick={(e) => { this.handleOnChange(e) }} href="#">All</a></li>
                        {ratings && ratings.map((rating: number, i: number) => (
                            <li key={i}><a onClick={(e) => { this.handleOnChange(e) }}
                                   href="#">{rating}+
                                </a></li>
                        ))
                        }

                    </ul>
                </div>
            </span>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(ImdbRatingDropDown) as typeof ImdbRatingDropDown;
