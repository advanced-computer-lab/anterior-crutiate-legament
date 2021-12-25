import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

 
export default function SkeletonTypography(props) {
  return (
    <Grid container spacing={0}>
      <Grid item xs>
        <div>
            <Typography component="div"  variant={props.variant}>
             <Skeleton />
            </Typography>
        </div>
      </Grid>
    </Grid>
  );
}
