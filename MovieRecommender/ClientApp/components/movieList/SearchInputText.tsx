﻿import * as React from 'react';
import { SearchMovieConstants } from '../../constants/constants';

class SearchInputText extends React.Component<{
    handleOnChange: any,
    searchKeyword: any
}, any> {
    
    public render() {
        const criterion = SearchMovieConstants.SEARCH_KEYWORD;
        const placeholder = SearchMovieConstants.SEARCH_TEXTBOX_PLACEHOLDER;
        const {
            handleOnChange,
            searchKeyword,
        } = this.props;
        
        const title = searchKeyword ? searchKeyword : placeholder;
        return (
            <div>
                <div className="col-sm-3">
                    <label
                        className="form-label"
                        htmlFor="keyword"
                    >
                        Movie Title:
                            </label>
                </div>
                <div className="col-sm-6">
                    <input
                        id="keyword"
                        className="form-control input-keyword"
                        type="text"
                        placeholder={placeholder}
                        title={title}
                        onChange={(e) => handleOnChange(e, criterion)}
                    />
                </div>
            </div>
        )
    }
}
export default SearchInputText;
