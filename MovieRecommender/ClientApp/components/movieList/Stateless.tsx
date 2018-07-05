import * as React from 'react';

export const TitleHolder: React.StatelessComponent<{ children: any }> =
    (children) => (
        <span>
            { children }
        </span>
    )

export const FillingEmptySpaceDiv: React.StatelessComponent<{}> = () => (
    <div className="filling-empty-space-childs"></div>
)