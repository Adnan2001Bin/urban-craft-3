import React, {useEffect, useState} from 'react'
import {HomePage_Image_PostForm} from '../components'
import appwriteService from '../appwrite/config'

import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <div>
            <HomePage_Image_PostForm post={post} />
        </div>
    </div>
  ) : null
}

export default EditPost