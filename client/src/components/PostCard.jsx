import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { IconButton } from '@mui/material';
import Actions from './Actions';
import moment from "moment"
import { useContext } from 'react';
import { AuthContex } from '../App';



export default function PostCard(prop) {
  const {user,_id,title,content,image,createdOn}=prop.post
  const {auth} = useContext(AuthContex)
  
  return (
    <Card sx={{ width: "100%", borderRadius:"10px" }} id={_id} elevation={10}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.slice(0,1)}
          </Avatar>
        }
        
        action={
          
          
          // auth._id === user._id && <Actions id={_id} /> 
          <Actions id={_id} />
          
        }
        
        title={title}
        subheader={moment(createdOn).fromNow()}
      />
      <CardMedia
        component="img"
        height="100%"
        image={image}
        alt={user}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      
    </Card>
  );
}
