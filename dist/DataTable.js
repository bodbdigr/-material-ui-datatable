"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Table_1 = require("@material-ui/core/Table");
const TableBody_1 = require("@material-ui/core/TableBody");
const TableHead_1 = require("@material-ui/core/TableHead");
const TableRow_1 = require("@material-ui/core/TableRow");
const TableCell_1 = require("@material-ui/core/TableCell");
class DataTable extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedRows: []
        };
    }
    selectRows(selectedRows) {
        this.setState({ selectedRows });
    }
    getCellValue(row, cell) {
        return row.handler ? row.handler(cell) : cell[row.field];
    }
    renderCell(rowDefinition, cellData, idx) {
        const value = this.getCellValue(rowDefinition, cellData);
        return (React.createElement(TableCell_1.default, { key: idx, style: rowDefinition.styles }, rowDefinition.preventDefault ?
            React.createElement("div", { onClick: e => { e.preventDefault(); e.stopPropagation(); } }, value)
            :
                value));
    }
    renderRow(data, idx) {
        const { selectedRows } = this.state;
        const { rowStyles, rows } = this.props;
        return (React.createElement(TableRow_1.default, { key: idx, style: rowStyles || {}, selected: selectedRows.indexOf(idx) !== -1 }, rows.map(row => this.renderCell(row, data, idx))));
    }
    clearSelection() {
        this.setState({
            selectedRows: []
        });
    }
    noEntries() {
        const { rows, title } = this.props;
        return (React.createElement(TableRow_1.default, null,
            React.createElement(TableCell_1.default, { colSpan: rows.length }, `No ${title}`)));
    }
    renderColumns() {
        const { source, loading } = this.props;
        if (!source && !loading) {
            return this.noEntries();
        }
        else {
            return source.map(this.renderRow.bind(this));
        }
    }
    render() {
        const { rows, selectable, } = this.props;
        const { selectedRows } = this.state;
        return (React.createElement(Table_1.default, null,
            React.createElement(TableHead_1.default, null,
                React.createElement(TableRow_1.default, null, rows.map(row => (React.createElement(TableCell_1.default, { key: row.title }, row.title))))),
            React.createElement(TableBody_1.default, null, this.renderColumns())));
    }
}
exports.DataTable = DataTable;
