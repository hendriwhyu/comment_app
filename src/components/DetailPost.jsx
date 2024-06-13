import React from 'react';
import { Box, Typography, Avatar, Button, Grid, Card } from '@mui/material';
import { BookmarkAddOutlined } from '@mui/icons-material';
import { FaUserPlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import useExpand from '../hooks/useExpand';
import ownerShape from '../types/Owner';
import { useLocation } from 'react-router';
import { formatDate, postedAt } from '../utils/date';
import ButtonMenu from './forumapp/ButtonMenu';
import { Link } from 'react-router-dom';

function DetailPost(props) {
  const {
    id,
    authUser,
    category,
    title,
    image,
    owner,
    startDate,
    endDate,
    createdAt,
    description,
    maxParticipant,
    participants,
    editPost,
    deletePost,
  } = props;
  const [isExpanded, handleExpand] = useExpand(false);
  const location = useLocation();
  const paths = location.pathname.split('/');
  const lastPath = paths[paths.length - 1];
  return (
    <Grid gap={2} display="flex" flexDirection="column">
      {lastPath === 'absent' ? (
        <Typography
          fontWeight="bold"
          color="softbrown"
          textTransform="capitalize">
          Absent Event
        </Typography>
      ) : (
        <Typography
          fontWeight="bold"
          color="softbrown"
          textTransform="capitalize">
          {category}
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        gap={2}
        color="textPrimary">
        <Typography variant="h4" fontWeight="bold" flex={1}>
          {title}
        </Typography>
        {owner?.id !== authUser?.id && authUser && (
          <Button
            sx={{
              alignItems: 'center',
              textAlign: 'center',
              display: 'flex',
              gap: 1,
              color: 'black',
            }}>
            <BookmarkAddOutlined />
            <Typography variant="body1">Bookmark</Typography>
          </Button>
        )}

        {owner?.id === authUser?.id && (
          <ButtonMenu
            event={props}
            editPost={editPost}
            deletePost={deletePost}
          />
        )}
      </Box>

      <Box
        display="flex"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={2.5}
        alignItems="center" // Ensure items are aligned properly
      >
        <Link to={`/users/${owner?.id}`}>
          <Avatar
            srcSet={owner?.profile?.photo}
            alt={owner?.profile?.name}
            sx={{ width: 56, height: 56, borderRadius: '50%' }}
          />
        </Link>
        <Link to={`/users/${owner?.id}`}>
          <Box
            display="flex"
            flexDirection="column"
            flex={1}
            justifyContent="center"
            py={1}>
            <Typography variant="h5" fontWeight="bold">
              {owner?.profile?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {owner?.profile?.headTitle}
            </Typography>
          </Box>
        </Link>
        <Typography
          variant="body1"
          color="textSecondary"
          alignSelf="flex-start"
          sx={{ marginLeft: 'auto' }}>
          {postedAt(createdAt)}
        </Typography>
      </Box>
      {category === 'Event' && (
        <Box
          display="flex"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap={2}
          color="textPrimary">
          <Typography fontWeight="600" flex={1}>
            {formatDate(startDate)} - {formatDate(endDate)}
          </Typography>
        </Box>
      )}

      {image && (
        <Box
          component="img"
          loading="lazy"
          src={image}
          alt={title}
          width="100%"
          height="350px"
          mt={2}
          sx={{ objectFit: 'cover' }}
        />
      )}

      <Card
        sx={{
          padding: 3,
          boxShadow: 1,
          flexDirection: 'column',
          borderRadius: '10px',
        }}>
        <Typography variant="body1" color="textSecondary">
          {isExpanded ? description : `${description?.substring(0, 100)}...`}
          <Button onClick={handleExpand} color="primary">
            {isExpanded ? 'Show less' : 'Show more'}
          </Button>
        </Typography>

        {category === 'Event' && lastPath !== 'absent' && (
          <Grid
            mt={2}
            display="flex"
            flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            justifyContent="space-between"
            gap={5}>
            <Box display="flex" alignItems="center" gap={2}>
              <FaUserPlus />
              <Typography>
                {participants?.length} / {maxParticipant} Participant
              </Typography>
            </Box>
            {authUser?.role === 'user' && (
              <Button variant="contained" color="primary">
                Join Event
              </Button>
            )}
          </Grid>
        )}
      </Card>
    </Grid>
  );
}

DetailPost.propTypes = {
  category: PropTypes.oneOf(['event', 'news']).isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default DetailPost;
