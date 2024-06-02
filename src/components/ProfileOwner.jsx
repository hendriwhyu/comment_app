import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function ProfileOwner({ name, headTItle, avatar }) {
  return (
    <Box
      display="flex"
      gap={2.5}
      mt={2}
      flexDirection={{ xs: 'column', md: 'row' }}
      flexWrap={{ xs: 'wrap', md: 'nowrap' }}>
      <Avatar
        src={avatar}
        alt={`${name}'s profile`}
        sx={{ width: 56, height: 56 }}
      />
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        justifyContent="center"
        py={1}>
        <Typography variant="h6" color="textPrimary">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {headTItle}
        </Typography>
      </Box>
    </Box>
  );
}

ProfileOwner.propTypes = {
  name: PropTypes.string.isRequired,
  headTItle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ProfileOwner;
