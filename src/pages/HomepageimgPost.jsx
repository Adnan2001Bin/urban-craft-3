import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function HomepageimgPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    if (post) {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        // Delete all associated images
        if (post.homePageImg1) {
          await appwriteService.deleteFile(post.homePageImg1);
        }
        if (post.homePageImg2) {
          await appwriteService.deleteFile(post.homePageImg2);
        }
        if (post.homePageImg3) {
          await appwriteService.deleteFile(post.homePageImg3);
        }
        navigate("/EditHomePageImg");
      }
    }
  };

  return post ? (
    <div className="w-full flex justify-center bg-white my-4">
      <div className="w-96 shadow-2xl bg-gray-50 text-stone-900 p-2">
        <figure>
          {post.homePageImg1 && (
            <img
              src={appwriteService.getFilePreview(post.homePageImg1)}
              alt="Home Page Image 1"
              className="rounded-xl mb-4"
            />
          )}
          {post.homePageImg2 && (
            <img
              src={appwriteService.getFilePreview(post.homePageImg2)}
              alt="Home Page Image 2"
              className="rounded-xl mb-4"
            />
          )}
          {post.homePageImg3 && (
            <img
              src={appwriteService.getFilePreview(post.homePageImg3)}
              alt="Home Page Image 3"
              className="rounded-xl mb-4"
            />
          )}
        </figure>
        <div className="card-body">
          
          {isAuthor && (
            <div className="flex justify-end space-x-4">
              <Link to={`/EditHomePageImg/${post.$id}`}>
                <Button className="bg-green-500 w-20">Edit</Button>
              </Link>
              <Button className="bg-red-700 w-20" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
