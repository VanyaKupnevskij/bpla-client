import { IconButton, InputBase, Paper, Tooltip, Zoom } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useState } from 'react';
import { QueryContext } from '../context/queryContext';

export default function SearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const { submit, setItemQuery, filteredQueries } = useContext(QueryContext);

  function handleReadyQuery() {
    const [searchValue] = filteredQueries.current.text_str;
    setSearchValue(searchValue ?? '');
  }

  useEffect(() => {
    setTimeout(handleReadyQuery, 1);
  }, []);

  function handleClickSearch() {
    setItemQuery('text', searchValue, true, true);
    submit();
  }

  function handleChangeSearch(event) {
    setSearchValue(event.target.value);
  }

  function handleClickClear() {
    setSearchValue('');
    setItemQuery('text', '', true, true);
    submit();
  }

  function handleKeyPress(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      handleClickSearch();
    }
  }

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{
        m: '4px',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
      }}>
      {searchValue.length > 0 && (
        <IconButton onClick={handleClickClear} type="button" sx={{ p: '10px' }} aria-label="search">
          <CloseIcon />
        </IconButton>
      )}
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={searchValue}
        onChange={handleChangeSearch}
        onKeyDown={handleKeyPress}
        placeholder="Пошук БПЛА..."
        inputProps={{ 'aria-label': 'search bpla' }}
      />
      <Tooltip TransitionComponent={Zoom} title="Search">
        <IconButton
          onClick={handleClickSearch}
          type="button"
          sx={{ p: '10px' }}
          aria-label="search">
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
}
