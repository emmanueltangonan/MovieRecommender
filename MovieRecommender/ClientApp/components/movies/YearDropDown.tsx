import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import MovieDetails from './MovieDetails';

type YearDropDownProps = any
    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class YearDropDown extends React.Component<YearDropDownProps, {}> {

    handleOnChange(e: any) {
        e.preventDefault();
        let year = e.currentTarget.textContent;
        year = year == 'All' ? 0 : year;
        //this.props.setYear(year);
        this.props.setSpinnerCriteria({
            ...this.props.movieSearchCriteria,
            year: year
        });
    }

    public render() {
        const year = this.props.movieSearchCriteria.year
        const currentYear = (new Date()).getFullYear();
        const yearRange = 100;
        const years = Array.from(new Array(yearRange), (val, index) => currentYear - (index + 1) );
        const title = year == 0 ? 'Year : All' : !year ? 'Year' : year + ' To Present';
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
                        { years && years.map((year: number, i: number) => (
                            <li key={i}><a onClick={(e) => { this.handleOnChange(e) }}
                                href="#"
                                >{year}</a></li>
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
)(YearDropDown) as typeof YearDropDown;
