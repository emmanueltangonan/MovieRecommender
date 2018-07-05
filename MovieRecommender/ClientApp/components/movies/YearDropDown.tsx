import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchMovieConstants } from '../../constants/constants';

//type YearDropDownProps = any
//    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
//    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
//    & RouteComponentProps<{}>; // ... plus incoming routing parameters

//class YearDropDown extends React.Component<YearDropDownProps, {}> {
class YearDropDown extends React.Component<{
    handleOnChange: any,
    year: any,
}, {}> {
    
    public render() {
        const criterion = SearchMovieConstants.YEAR;
        const {
            handleOnChange,
            year,
        } = this.props;
        const currentYear = (new Date()).getFullYear();
        const yearRange = 100;
        const years = Array.from(new Array(yearRange), (val, index) => currentYear - (index + 1) );
        const title = year == 0 ? 'Year Released: All' : !year ? 'Year Released' : year + ' Onwards';
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
                        <li><a onClick={(e) => { handleOnChange(e, criterion) }} href="#">All</a></li>
                        { years && years.map((year: number, i: number) => (
                            <li key={i}><a onClick={(e) => { handleOnChange(e, criterion) }}
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
export default YearDropDown;
//export default connect(
//    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
//    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
//)(YearDropDown) as typeof YearDropDown;
