import React from 'react';
import Icon from '@mdi/react';
import { mdiArrowDownBold } from '@mdi/js';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 390,
  },
  media: {
    height: 100,
    width: '100%'
  },
});

const StockCard = (props) => {

    const classes = useStyles();

    

    return (
        <Card className={classes.card} raised={true}>
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={props.src}
                title={props.company}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.company}
                    </Typography>
                    <Typography variant="h5" color="textPrimary" component="h5">
                         <p style={props.style}>
                             Current Price: ${props.price}
                             <span>
                                <Icon path={mdiArrowDownBold}
                                    size={1}
                                    horizontal
                                    vertical
                                    rotate={props.rotate}
                                    color={props.arrowColor}
                                />
                             </span>
                        </p>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <button 
                    size="small" 
                    color="primary"
                    name={props.name}
                    onClick={props.onClick}
                >
                    Full Report
                </button>
                <Button 
                    size="small" 
                    color="primary"

                >
                    Buy Now
                </Button>
            </CardActions>
        </Card>
    )
}

export default StockCard;
