import * as React from 'react';
import { SearchMovieConstants } from '../../constants/constants';

class OrderDropdown extends React.Component<{
    handleOnChange: any,
    order: any
}, {}> {

    public render() {
        const criterion = SearchMovieConstants.ORDER;
        const orderList = SearchMovieConstants.ORDER_LIST;
        const {
            handleOnChange,
            order,
        } = this.props;
        return (
            <div className="order-by">
                <div className="dropdown">
                    <button className="btn btn-default dropdown-toggle sort-by-btn borderless"
                        type="button"
                        id="order"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        <strong>{order}</strong>
                        &nbsp;<span><i className="fa fa-angle-down"></i></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="order">
                        {orderList.map((orderOption: string, i: number) => (
                            <li key={i}>
                                <a
                                    onClick={(e) => { handleOnChange(e, criterion) }}
                                    href="#">
                                    {orderOption}
                                </a>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
export default OrderDropdown;