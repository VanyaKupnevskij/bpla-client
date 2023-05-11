import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { QueryContext } from '../context/queryContext';

export default function Paginator({ countTotal }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const { submit, filteredQueries, setItemQuery } = React.useContext(QueryContext);

  function handleReadyQuery() {
    if (filteredQueries.current.page) {
      setPage(filteredQueries.current.page);
    }
    if (filteredQueries.current.limit) {
      setRowsPerPage(filteredQueries.current.limit);
    }
  }

  React.useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    setItemQuery('page', newPage);
    submit();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    const queryValue = event.target.value === 8 ? 0 : event.target.value;
    setItemQuery('limit', queryValue);
    submit();
  };

  return (
    <TablePagination
      component="div"
      count={countTotal}
      page={countTotal === 0 ? 0 : page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[8, 16, 24, 32]}
      labelRowsPerPage="Єлементів на сторінці:"
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
