import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from './MovieDetails';

type GenreDropDownProps = any
    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class GenreDropDown extends React.Component<GenreDropDownProps, {}> {

    handleOnChange(e: any) {
        e.preventDefault();
        const genre = e.currentTarget.textContent;
        this.props.setSpinnerCriteria({
            ...this.props.movieSearchCriteria,
            genre: genre
        });
    }

    public render() {
        const genre = this.props.movieSearchCriteria.genre;
        const title = !genre ? 'Genre' : genre == 'All' ? 'Genre: All' : genre;
        return (
            <span>
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle"
                        type="button" id="dropdownMenu1"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                        title={title}
                    >
                        {title}
                            &nbsp; 
                        <span className="caret"></span>
                    </button>
                    <ul className="dropdown-menu horizontal-view" aria-labelledby="dropdownMenu1">
                        <li><a onClick={(e) => { this.handleOnChange(e) }} href="#">All</a></li>
                        <li><a onClick={(e) => { this.handleOnChange(e) }} href="#">Action</a></li>
                        <li><a onClick={(e) => { this.handleOnChange(e) }} href="#">Comedy</a></li>
                        <li><a onClick={(e) => { this.handleOnChange(e) }} href="#">Romance</a></li>
                    </ul>
                </div>
            </span>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(GenreDropDown) as typeof GenreDropDown;
