import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiFinance } from '@mdi/js';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit">
            <Link to="/">
              <Icon path={mdiFinance}
                size={2}
                horizontal
                vertical
                rotate={180}
                color="white"
              />
            </Link>
            
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Stock Watch
          </Typography>
          <Button size="large" color="inherit">NYSE</Button>
          <Button size="medium" color="inherit">Nasdaq</Button>
          <Button size="medium" color="inherit">Portfolio</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;