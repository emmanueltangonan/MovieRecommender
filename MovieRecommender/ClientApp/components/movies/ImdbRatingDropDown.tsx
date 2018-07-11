import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchMovieConstants } from '../../constants/constants';

//type ImdbRatingDropDownProps = any
//    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
//    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
//    & RouteComponentProps<{}>; // ... plus incoming routing parameters

//class ImdbRatingDropDown extends React.Component<ImdbRatingDropDownProps, {}> {
class ImdbRatingDropDown extends React.Component<{
    handleOnChange: any,
    rating: any
}, {}> {
    
    public render() {
        const criterion = SearchMovieConstants.RATING;
        const {
            handleOnChange,
            rating,
        } = this.props;
        const range = SearchMovieConstants.RATING_RANGE;
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
                        <span className="caret rotate"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li><a onClick={(e) => { handleOnChange(e, criterion) }} href="#">All</a></li>
                        {ratings && ratings.map((rating: number, i: number) => (
                            <li key={i}><a onClick={(e) => { handleOnChange(e, criterion) }}
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
export default ImdbRatingDropDown;
//export default connect(
//    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
//    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
//)(ImdbRatingDropDown) as typeof ImdbRatingDropDown;
