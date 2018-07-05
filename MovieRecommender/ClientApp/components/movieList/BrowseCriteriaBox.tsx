import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as MovieListState from '../../store/MovieList';
import GenreDropDown from '../movies/GenreDropDown';
import YearDropDown from '../movies/YearDropDown';
import ImdbRatingDropDown from '../movies/ImdbRatingDropDown'
import SearchInputText from './SearchInputText';
import MovieStatusDropDown from './MovieStatusDropDown';
import { SearchMovieConstants, SharedConstants } from '../../constants/constants';

type BrowseCriteriaBoxProps = any
    & MovieListState.MovieListState        // ... state we've requested from the Redux store
    & typeof MovieListState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters

class BrowseCriteriaBox extends React.Component<BrowseCriteriaBoxProps, {}> {
    constructor(props: any) {
        super(props);
        this.handleDropDownOnChange = this.handleDropDownOnChange.bind(this);
        this.handleInputTextOnChange = this.handleInputTextOnChange.bind(this);
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
        this.props.setBrowseSearchCriteria({
            ...this.props.movieSearchCriteria,
            [criterion]: value
        });
    }

    handleInputTextOnChange(e: any, criterion: string) {
        e.preventDefault();
        let value = e.currentTarget.value;
        switch (criterion) {
            case SearchMovieConstants.SEARCH_KEYWORD:
                value = value.toLowerCase();
                break;
        }
        this.props.setBrowseSearchCriteria({
            ...this.props.movieSearchCriteria,
            [criterion]: value
        });
    }

    public render() {
        const title = SearchMovieConstants.SEARCH_MOVIES_BUTTON_TITLE;
        const {
            movieSearchCriteria,
        } = this.props;
        return (
            movieSearchCriteria &&
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
                        <MovieStatusDropDown
                            status={movieSearchCriteria.status}
                            handleOnChange={this.handleDropDownOnChange}
                        />
                    </div>
                </div>
                <div className="row spinner-criteria-elem-wrapper">
                    <SearchInputText
                        searchKeyword={movieSearchCriteria.searchKeyword}
                        handleOnChange={this.handleInputTextOnChange}
                    />
                    <div className="col-sm-3">
                        <button
                            className="btn btn-success spinner-button pull-right"
                            onClick={() => this.props.requestMovieList(movieSearchCriteria)}
                            title={title}
                        > {title} </button>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(
    (state: ApplicationState) => state.movieList, // Selects which state properties are merged into the component's props
    MovieListState.actionCreators                 // Selects which action creators are merged into the component's props
)(BrowseCriteriaBox) as typeof BrowseCriteriaBox;
