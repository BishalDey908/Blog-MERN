import { Box } from "@mui/material";
import PostCard from "./PostCard";
import { useEffect, useState } from "react";

const DisplayPost = () => {
  // const post = [

  //   {
  //       id:1,
  //     title: "My First Post",
  //     content: "This is my first blog post.",
  //     image:"https://i.etsystatic.com/41677661/r/il/1e04fb/4768867579/il_570xN.4768867579_h0lr.jpg",
  //     user: "Jack",
  //     timestamp: "2 day ago",
  //   },
  //   {
  //       id:2,
  //       title: "My Second Post",
  //     content: "This is my second blog post.",
  //     image:"https://i.redd.it/7lgjpitxqbq91.png",
  //     user: "Jack55",
  //     timestamp: "3 day ago",
  //   },
  //   {
  //       title: "My third Post",
  //     content: "This is my third blog post.",
  //     image:"https://images.nightcafe.studio/jobs/MrzwMovaZ7dyyjIsJata/MrzwMovaZ7dyyjIsJata.jpg?tr=w-1600,c-at_max",
  //     user: "Jack66",
  //     timestamp: "4 day ago",
  //   }
  // ];

  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://blog-mern-backend-hazel.vercel.app/api/blog/", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      const data = await res.json();

      if (res.ok) {
        setPost(data);
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, [post]);
  return (
    <div>
      <Box
        sx={{
          maxWidth: "550px",
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          gap: "3",
          py: 10,
        }}
      >
        {post &&
          post.map((post, index) => {
            return (
              <div key={index}>
                <br />
                <PostCard post={post} />
                <br />
              </div>
            );
          })}
      </Box>
    </div>
  );
};

export default DisplayPost;
