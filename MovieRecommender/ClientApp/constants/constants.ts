export class ApiConstants {
    public static readonly API_BASE_URL = 'http://www.omdbapi.com/?apikey=';
    public static readonly API_KEY = '5330a888';
    public static readonly API_KEY_TMDB = '9d2bff12ed955c7f1f74b83187f188ae';
    public static readonly API_BASE_URL_TMDB = 'https://api.themoviedb.org/3';
    public static readonly API_ACTION_TMDB_FIND = 'find';
    public static readonly API_CALL_TIMEOUT = 10000;
}

export class Dimensions {
    public static readonly YOUTUBE_HEIGHT = 390;
    public static readonly YOUTUBE_WIDTH = 640;
}

export class SharedConstants {
    public static readonly ALL = 'All';
    public static readonly REQUEST_VERIFICATION_TOKEN = 'RequestVerificationToken';
}

export class Assets {
    public static readonly LOADING_GIF: any = require('../assets/Loading.gif');
    public static readonly MINI_LOADING_GIF: any = require('../assets/mini-loading.gif');
    public static readonly RATING_STAR: any = require('../assets/rating-star.png');
    public static readonly IMDB_LOGO: any = require('../assets/imdb-logo.svg');
    public static readonly ROTTEN_TOM_LOGO: any = require('../assets/rotten-tomatoes-logo.png');
    public static readonly METACRITIC_LOGO: any = require('../assets/metacritic-logo.png');
}

export class PaginationConst {
    public static readonly ITEMS_COUNT_PER_PAGE = 15;
    public static readonly PAGE_RANGE_DISPLAYED = 6;
    public static readonly ACTIVE_LINK_CLASS= 'pagination-active-a';
    public static readonly PREV_PAGE_TEXT = 'Prev';
    public static readonly NEXT_PAGE_TEXT = 'Next';
}

export class SearchMovieConstants {
    public static readonly YEAR = 'year';
    public static readonly GENRE = 'genre';
    public static readonly RATING = 'rating';
    public static readonly RANDOMIZE_BUTTON_TITLE = 'Get Random Movie';
    public static readonly SEARCH_MOVIES_BUTTON_TITLE = 'Search';
    public static readonly RATING_RANGE = 5;

    public static readonly SORTED_BY = 'sortBy';
    public static readonly SORT_OPTION_LIST = ['Title', 'Rating', 'Year'];

    public static readonly SEARCH_KEYWORD = 'searchKeyword';
    public static readonly SEARCH_TEXTBOX_PLACEHOLDER = 'Movie title or keyword';

    public static readonly ORDER = 'order';
    public static readonly ORDER_ASC = 'Ascending';
    public static readonly ORDER_DESC = 'Descending';
    public static readonly ORDER_LIST = [SearchMovieConstants.ORDER_ASC, SearchMovieConstants.ORDER_DESC];

    public static readonly STATUS = 'status';
    public static readonly STATUS_LIST = [SharedConstants.ALL, 'Watched', 'Not Watched'];
}
export class ObjPropertyConstants {
    public static readonly IS_SEEN_BTN_HOVERED = 'isSeenBtnHovered';
    public static readonly IS_UNINTERESTED_BTN_HOVERED = 'isUninterestedBtnHovered';
}
