import * as React from 'react';

export const TitleHolder: React.StatelessComponent<{ children: any }> =
    (children) => (
        <span>
            { children }
        </span>
    )
