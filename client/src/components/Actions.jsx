import * as React from 'react';
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Actions({id}) {
  const [anchorEl, setAnchorEl] = React.useState(null) 
  const open = Boolean(anchorEl);
  const navigator = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate=()=>{
    console.log(id)
    navigator("/update/"+id)
  }
  const handleDelete = async ()=>{
    console.log(id)

    const res= await fetch("https://blog-mern-backend-hazel.vercel.app/api/blog/delete/"+id,{
      method:"DELETE",
      headers:{
        token:localStorage.getItem("token")
      }
    })
    const data =await res.json()

    if(res.ok){
      toast.success("Blog deleted");
    }else{
      console.log(data)
    }
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose(),handleUpdate()}}>Update</MenuItem>
        <MenuItem onClick={()=>{handleClose(),handleDelete()}}>Delete</MenuItem>
      </Menu>
    </div>
  );
}