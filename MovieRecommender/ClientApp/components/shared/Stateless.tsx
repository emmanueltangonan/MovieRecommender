import * as React from 'react';

export const Loading: React.StatelessComponent<{}> = () => (
    <div className="loader-div">
        <img src={require('../../assets/Loading.gif')} />
    </div>
)

