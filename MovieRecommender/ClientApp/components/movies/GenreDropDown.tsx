import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { SearchMovieConstants, SharedConstants } from '../../constants/constants';
import Error from '../../constants/errorConstants';

//type GenreDropDownProps = any
//    & MoviesState.RandomMovieState        // ... state we've requested from the Redux store
//    & typeof MoviesState.actionCreators      // ... plus action creators we've requested
//    & RouteComponentProps<{}>; // ... plus incoming routing parameters

//class GenreDropDown extends React.Component<GenreDropDownProps, {}> {
class GenreDropDown extends React.Component<{
    handleOnChange: any,
    genre: any
}, any> {
    _ismounted = false;
    constructor(props: any) {
        super(props);
        this.state = {
            genres: null,
            error: null
        }
        this.getGenres = this.getGenres.bind(this);
    }

    componentDidMount() {
        this._ismounted = true;
        this.getGenres();
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    getGenres() {
        let fetchTask = fetch(`api/ListData/Genres`)
            .then(response => {
                if (response.status == 204) {
                    return null;
                }
                return response.json() as any;
            })
            .then(data => {
                if (!data) {
                    this._ismounted && this.setState({ error: Error.ERROR_101 });
                } else {
                    this._ismounted && this.setState({ genres: data });
                }
            }).catch(() => this._ismounted && this.setState({ error: Error.ERROR_101 }));
    }

    public render() {
        const criterion = SearchMovieConstants.GENRE;
        const { genres } = this.state;
        const {
            handleOnChange,
            genre,
        } = this.props;
        const title = !genre ? 'Genre' : genre == SharedConstants.ALL ? 'Genre: All' : genre;
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
                        <span className="caret rotate"></span>
                    </button>
                    <ul className="dropdown-menu horizontal-view" aria-labelledby="dropdownMenu1">
                        <li><a onClick={(e) => { handleOnChange(e, criterion) }} href="#">All</a></li>
                        {genres && 
                            genres.map((genre: any, i: number) => (
                            <li key={genre.id}>
                                <a
                                onClick={(e) => { handleOnChange(e, criterion) }}
                                href="#">
                                    {genre.name}
                                </a>
                            </li>
                            ))
                        }
                        <li className="filling-empty-space-childs"></li>
                        <li className="filling-empty-space-childs"></li>
                        <li className="filling-empty-space-childs"></li>
                    </ul>
                </div>
            </span>
        )
    }
}
export default GenreDropDown;
//export default connect(
//    (state: ApplicationState) => state.randomMovie, // Selects which state properties are merged into the component's props
//    MoviesState.actionCreators                 // Selects which action creators are merged into the component's props
//)(GenreDropDown) as typeof GenreDropDown;
