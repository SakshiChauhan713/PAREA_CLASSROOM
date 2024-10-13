import PostForm from "@/components/forms/PostForm"

const CreatePost = () => {
  return (

    <div className='flex flex-1'>
      <div className="common-container">
        <div className='max-w 5x1 flex-star gap-3 justify-start w-full'>
          <img 
          src="/public/assets/icons/add-post.svg"
          width={36}
          height={36}
          alt="add-post"
          />
        </div>
        <h2 className='h3-bol md:h2-bold text-left w-full text-4xl'>Create Post</h2>
           <PostForm /> 
      </div>
    </div>
  )
}

export default CreatePost