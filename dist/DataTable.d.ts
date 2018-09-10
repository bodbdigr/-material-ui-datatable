import * as React from 'react';
declare type CSSDeclaration = {
    [key: string]: string;
};
interface RowDefinition<DT> {
    title: string;
    styles?: CSSDeclaration;
    handler?: (row: DT) => JSX.Element;
    field?: string;
}
interface Props<DT> {
    rows: RowDefinition<DT>[];
    title: string;
    selectable: boolean;
    source: DT[];
    rowStyles?: CSSDeclaration;
    loading: boolean;
}
interface IState {
    selectedRows: number[];
}
export declare class DataTable<DT> extends React.Component<Props<DT>, IState> {
    state: {
        selectedRows: any[];
    };
    private selectRows;
    private getCellValue;
    private renderCell;
    renderRow(data: any, idx: any): JSX.Element;
    clearSelection(): void;
    private noEntries;
    private renderColumns;
    render(): JSX.Element;
}
export {};
