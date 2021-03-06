import {Paper} from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import {makeStyles} from '@material-ui/core/styles'
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {requestLobbyInfo, requestUserInfo} from '../store'
import {CreateRoom} from './CreateRoom'
/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    padding: theme.spacing(3),
    margin: 'auto',
    marginTop: theme.spacing(2),
    maxWidth: 800
  }
}))
const ListItemLink = props => {
  return <ListItem button component={Link} {...props} />
}
export const Lobby = props => {
  // component mount hook?
  useEffect(() => {
    requestLobbyInfo()
    requestUserInfo()
  }, [])
  const classes = useStyles()

  if (!props.isLoaded) {
    return <div>Loading...</div>
  }

  const {user, lobby} = props
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h3>Welcome, {user.name}</h3>
        <h4>{lobby.total} players online</h4>
        <h4>{lobby.rooms.length} rooms</h4>
        <CreateRoom username={user.name} />

        <div className={classes.root}>
          <List component="nav">
            {lobby.rooms.map(room => (
              <ListItemLink key={room.id} to={`/rooms/${room.id}`}>
                <ListItemText
                  primary={room.name}
                  secondary={room.playerCount + '/' + room.size}
                />
              </ListItemLink>
            ))}
          </List>
        </div>
      </Paper>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoaded: !!state.user.name,
    user: state.user,
    lobby: state.socket.lobby
  }
}

export default connect(mapState)(Lobby)
