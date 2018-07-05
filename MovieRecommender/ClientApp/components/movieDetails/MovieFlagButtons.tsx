import * as React from 'react';
import { ObjPropertyConstants } from '../../constants/constants';

class MovieFlagButtons extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            [ObjPropertyConstants.IS_SEEN_BTN_HOVERED]: false,
            [ObjPropertyConstants.IS_UNINTERESTED_BTN_HOVERED]: false,
        };
        this.handleFlagButtonMouseEnter = this.handleFlagButtonMouseEnter.bind(this);
        this.handleFlagButtonMouseLeave = this.handleFlagButtonMouseLeave.bind(this);
    }

    handleFlagButtonMouseEnter(btnStatePropName: string) {
        this.setState({
            [btnStatePropName]: true
        });
    }

    handleFlagButtonMouseLeave(btnStatePropName: string) {
        this.setState({
            [btnStatePropName]: false
        });
    }


    public render() {
        const seenBtnProp = ObjPropertyConstants.IS_SEEN_BTN_HOVERED;
        const uninterestedBtnProp = ObjPropertyConstants.IS_UNINTERESTED_BTN_HOVERED;
        const {
            isSeenBtnHovered,
            isUninterestedBtnHovered,
        } = this.state;

        return (
            <div className="col-sm-3 movie-action-icons">
                <div className="movie-action-icons-holder">
                    <button
                        className="btn seen-btn"
                        title="Mark As Watched"
                        onMouseEnter={() => this.handleFlagButtonMouseEnter(seenBtnProp)}
                        onMouseLeave={() => this.handleFlagButtonMouseLeave(seenBtnProp)}
                    >
                        {isSeenBtnHovered
                            ? <span><i className="fa fa-check"></i>&nbsp;Seen It</span>
                            : <i className="fa fa-check"></i>
                        }
                    </button>
                </div>
                <div className="movie-action-icons-holder">
                    <button
                        className="btn uninterested-btn"
                        title="Hide From Future Searches"
                        onMouseEnter={() => this.handleFlagButtonMouseEnter(uninterestedBtnProp)}
                        onMouseLeave={() => this.handleFlagButtonMouseLeave(uninterestedBtnProp)}
                    >
                        {isUninterestedBtnHovered
                            ? <span><i className="fa fa-remove"></i>&nbsp;Not Interested</span>
                            : <i className="fa fa-remove"></i>
                        }
                    </button>
                </div>
            </div>
        );
    }
}

export default MovieFlagButtons;
