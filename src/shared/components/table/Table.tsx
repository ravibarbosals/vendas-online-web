import { Table as TableAntd, TableProps } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <TableAntd {...props} />;
}

export default Table;
