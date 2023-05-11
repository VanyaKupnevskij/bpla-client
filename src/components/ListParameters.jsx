import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import listParameters from '../context/listParameters';
import { Link } from '@mui/material';

export default function ListParameters({ datas, skipParameters = [] }) {
  const filterList = { ...listParameters };

  for (let skipedParam of skipParameters) {
    if (filterList[skipedParam]) {
      delete filterList[skipedParam];
    }
  }

  return (
    <List disablePadding sx={{ mt: 2, maxWidth: 'sm', mx: 'auto' }}>
      {Object.values(filterList).map((parameter, index) => {
        const backColor = index & 1 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(10, 10, 10, 0.05)';
        let value = '';
        if (parameter.type === 'MultipleSelect') {
          if (datas[parameter.name].length !== 0) {
            value = datas[parameter.name].map((item) => <div key={item}>{item}</div>);
          }
        } else {
          value = datas[parameter.name] || '---';
        }

        return (
          <ListItem
            key={parameter.name}
            alignItems="flex-start"
            sx={{
              py: 1,
              px: 1,
              background: backColor,
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <ListItemText
              primary={parameter.label ?? parameter.title}
              sx={{ maxWidth: { xs: '10rem', sm: '100%' } }}
            />
            {parameter.name === 'sourceUrl' && value !== '---' ? (
              <Link href={value} target="_blank" variant="caption" sx={{ maxWidth: '70%' }}>
                {value}
              </Link>
            ) : (
              <Typography variant="caption" sx={{ maxWidth: '70%' }}>
                {value}
              </Typography>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
