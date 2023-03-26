import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import "../styles/Form.css";
import { TextField, Button, Avatar } from "@mui/material";
import { fetchCurrentUser } from "../features/user/currentUserSlice";
import Container from "../components/Container";

export default function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.currentUser.entities);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  useEffect(() => {
    if(user) {
      setUsername(user.username)
      if(user.avatar) setAvatar(user.avatar)
    }
  }, [user])

  function handleSubmit(event) {
    event.preventDefault()

    const formData = {username: username, avatar: avatar}

    console.log(formData)

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((r) => {
      if(r.ok) {
        r.json().then((data) => {
          console.log(data)
          navigate("/me")
        })
      }
    })
  }

  return (
    <Container justify="center">
      <Avatar 
        src={avatar} 
        alt="avatar" 
        sx={{ width: 120, height: 120, m: 2 }} 
      />

      <form className="Form" onSubmit={handleSubmit}>
        <TextField 
          label="Username" 
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField 
          label="Avatar" 
          margin="normal"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          helperText="Add the URL of your desired avatar"
        />


        <Button variant="contained" type="submit" className="submit">
          Update
        </Button>
      </form>
    </Container>
  )
}