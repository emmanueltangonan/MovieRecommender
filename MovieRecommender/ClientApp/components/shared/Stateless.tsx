import * as React from 'react';
import { Assets } from '../../constants/constants';

export const Loading: React.StatelessComponent<{}> = () => (
    <div className="loader-div">
        <img src={Assets.LOADING_GIF} />
    </div>
)

export const MiniLoading: React.StatelessComponent<{}> = () => (
    <img src={Assets.MINI_LOADING_GIF} />
)

