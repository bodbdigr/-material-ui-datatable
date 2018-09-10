import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

type CSSDeclaration = {[key: string]: string};

interface RowDefinition<DT> {
  title: string;
  styles?: CSSDeclaration;
  handler?: (row:DT) => JSX.Element;
  field?: string;
}

interface Props<DT> {
  rows: RowDefinition<DT>[];
  title: string;
  selectable: boolean;
  source: DT[]
  rowStyles?: CSSDeclaration;
  loading: boolean;
}

interface IState {
  selectedRows: number[];
}

export class DataTable<DT> extends React.Component<Props<DT>, IState> {
  state = {
    selectedRows: []
  }

  private selectRows(selectedRows) {
    this.setState({ selectedRows });
  }

  private getCellValue(row, cell) {
    return row.handler ? row.handler(cell) : cell[row.field];
  }

  private renderCell(rowDefinition, cellData, idx) {
    const value = this.getCellValue(rowDefinition, cellData)
    return (
      <TableCell key={idx} style={rowDefinition.styles} >
        {rowDefinition.preventDefault ?
          <div onClick={e => { e.preventDefault(); e.stopPropagation(); }}>
            {value}
          </div>
          :
          value
        }
      </TableCell>
    );
  }

  renderRow(data, idx) {
    const { selectedRows } = this.state;
    const { rowStyles, rows } = this.props;
    return (
      <TableRow
        key={idx}
        style={rowStyles || {}}
        selected={selectedRows.indexOf(idx) !== -1}
      >
        {rows.map(row => this.renderCell(row, data, idx))}
      </TableRow>
    );
  }

  clearSelection() {
    this.setState({
      selectedRows: []
    });
  }

  private noEntries() {
    const { rows, title } = this.props;
    return (
      <TableRow>
        <TableCell
          colSpan={rows.length}
        >
          {`No ${title}`}
        </TableCell>
      </TableRow>
    );
  }

  private renderColumns() {
    const { source, loading } = this.props;
      if (!source && !loading) {
        return this.noEntries();
      } else {
        return source.map(this.renderRow.bind(this))
      }
  }

  public render() {
    const { rows, selectable, } = this.props;
    const { selectedRows } = this.state

    return (
      <Table>
        <TableHead>
          <TableRow>
          { rows.map(row => (
            <TableCell key={row.title}>
              {row.title}
            </TableCell>
          )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { this.renderColumns() }
        </TableBody>
      </Table>
    );
  }
}
