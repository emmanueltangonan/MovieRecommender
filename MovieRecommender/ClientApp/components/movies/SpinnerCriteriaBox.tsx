import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MoviesState from '../../store/RandomMovie';
import GenreDropDown from './GenreDropDown';
import YearDropDown from './YearDropDown';
import ImdbRatingDropDown from './ImdbRatingDropDown';
import { SearchMovieConstants, SharedConstants } from '../../constants/constants';

type SpinnerCriteriaBoxProps = any
    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class SpinnerCriteriaBox extends React.Component<SpinnerCriteriaBoxProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleDropDownOnChange = this.handleDropDownOnChange.bind(this);
    }

    componentDidMount() {
        //const { genres } = this.props;
        //!genres && this.props.getGenres();
    }

    handleDropDownOnChange(e: any, criterion: string) {
        e.preventDefault();
        let value = e.currentTarget.textContent;
        switch (criterion) {
            case SearchMovieConstants.YEAR:
                value = value == SharedConstants.ALL ? 0 : value;
                break;
            case SearchMovieConstants.GENRE:
                break;
            case SearchMovieConstants.RATING:
                value = value == SharedConstants.ALL ? 0 : value.substring(0, value.length - 1);
                break;
        }

        this.props.setSpinnerCriteria({
            ...this.props.movieSearchCriteria,
            [criterion]: value
        });
    }

    public render() {
        const title = SearchMovieConstants.RANDOMIZE_BUTTON_TITLE;
        const {
            movieSearchCriteria,
        } = this.props;
        return (
            <div className="row spinner-criteria">
                <div className="row spinner-criteria-elem-wrapper">
                    <div className="col-sm-3">
                        <GenreDropDown
                            handleOnChange={this.handleDropDownOnChange}
                            genre={movieSearchCriteria.genre}
                        />
                    </div>
                    <div className="col-sm-3">
                        <YearDropDown
                            year={movieSearchCriteria.year}
                            handleOnChange={this.handleDropDownOnChange}
                        />
                    </div>
                    <div className="col-sm-3">
                        <ImdbRatingDropDown
                            rating={movieSearchCriteria.rating}
                            handleOnChange={this.handleDropDownOnChange}
                        />
                    </div>
                    <div className="col-sm-3">
                        <button
                            className="btn btn-success spinner-button pull-right"
                            onClick={() => this.props.requestRandomMovie(movieSearchCriteria)}
                            title={title}
                        > {title} </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
)(SpinnerCriteriaBox) as typeof SpinnerCriteriaBox;
