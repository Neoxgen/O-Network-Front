import { useState } from 'react';
import  PropTypes from 'prop-types';
import './style.scss'
import { useSelector } from 'react-redux';
import { getPostReactions } from '../../redux/selectors/feed';
import {getUserOrganizationId } from '../../redux/selectors/user'
import { Box, Button } from '@mui/material';
import { Popover, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Link as MuiLink } from '@mui/material'


const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    background: `${theme.palette.background.paper}`,
    padding: 2,
}));

function PostReaction({postId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const postReactions = useSelector(getPostReactions(postId));
    const organizationId = useSelector(getUserOrganizationId)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const tagExists = (reactions, tagToCheck) => {
        for (const reaction of reactions) {
            if (reaction.type && reaction.type.tag === tagToCheck) {
                return true;
            }
        }
        return false;
    };
    
    
    return (
        <div className="c-reaction-post">
            <Button onClick={handleClick} className ="c-reaction-post__button" sx={{ p: 0  }}>
                {postReactions.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        {postReactions.length} réactions 
                    </Typography>
                ) : (
                    <>
                        {tagExists(postReactions, 'like') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-like.png" alt="Emoji like" />
                        )}
                        {tagExists(postReactions, 'love') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-love.png" alt="Emoji love" />
                        )}
                        {tagExists(postReactions, 'haha') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-haha.png" alt="Emoji haha" />
                        )}
                        {tagExists(postReactions, 'wow') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-wow.png" alt="Emoji wow" />
                        )}
                        {tagExists(postReactions, 'sad') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-sad.png" alt="Emoji sad" />
                        )}
                        {tagExists(postReactions, 'angry') && (
                            <img className='c-reaction-post__image' src="/assets/reactions/emoji-angry.png" alt="Emoji angry" />
                        )}
                        {postReactions.length}
                    </>
                )}
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box className ="c-reaction-post__info" >
                    {postReactions.map((reaction) => (
                        <Box 
                            className ="c-reaction-post__info-emoji" 
                            key={reaction.id} 
                            sx={{ display: 'flex', alignItems: 'center', padding: '0', margin: 1 }}>
                            <Badge
                                className ="c-reaction-post__info-container-picture" 
                                sx={{  marginRight: '0.5em' }}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar src={`/assets/reactions/emoji-${reaction.type.tag}.png`} />
                                }
                            >
                                <Avatar 
                                    component={Link} 
                                    to={`/${organizationId}/user/${reaction.author.id}`}
                                    alt={reaction.author.name} 
                                    src={reaction.author.profilePicture} 
                                />
                            </Badge>
                            <Box>
                                <MuiLink 
                                    component={Link}
                                    to={`/${organizationId}/user/${reaction.author.id}`}
                                >
                                    <Typography 
                                        variant="body2" 
                                        className ="c-reaction-post__identity"
                                    >
                                        {`${reaction.author.name} ${reaction.author.surname}`}
                                    </Typography>
                                </MuiLink>
                                <Typography 
                                    variant="body2"
                                    className ="c-reaction-post__job"
                                >
                                    {reaction.author.job}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </div>
    )
}

PostReaction.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostReaction
