import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePaste } from '../redux/pasteSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faClone } from '@fortawesome/free-regular-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

const handleShare = async (pasteId) => {
  const shareLink = `${window.location.origin}/?pasteId=${pasteId}`;

  if (navigator.share) {
    // Mobile native share
    await navigator.share({
      title: "Check this Paste",
      url: shareLink,
    });
  } else {
    // Desktop fallback → copy link
    await navigator.clipboard.writeText(shareLink);
    toast.success("Share link copied to clipboard!");
  }
};

const Paste = () => {

  const paste = useSelector((state) => state.paste.pastes);
  const[searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  

  const filteredPaste = paste.filter(
    (paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(deletePaste(pasteId));
  }

  return (
    <div className='border-black border-2 min-w-[700px]'>
      <div>
        <div className='min-w-[680px] mt-1 h-10 border-b border-black'> 
          <input
            className="
              min-w-[680px]
              h-8
              px-4
              font-semibold
              rounded-lg
              border border-gray-300
              focus:outline-none
              focus:ring-2
              focus:ring-red-500
              focus:border-red-500
              transition-all
              duration-300
              mt-1
            "
            type="search"
            placeholder="List of All Content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='flex '>
            <h2 className='font-bold mt-1 ml-1'
            >All Contents Here</h2>
          </div>
          
        </div>
        <div className='flex flex-col gap-4 mt-7 w-[700px] border-black'>
          {
            filteredPaste.length > 0 &&
            filteredPaste.map(
              (paste) =>{
                return(
                  <div className='border-t border-b flex border-black' key={paste?._id}>
                    <div className='w-[450px] justify-between'>
                      <div className='flex font-bold mt-1 ml-1 '>
                        {paste.title}
                      </div>
                      <div className='flex mt-3 ml-1'>
                        {paste.content}
                      </div>
                    </div>

                    <div className=''>
                      <div className='flex flex-row gap-2 place-content-evenly mr-3 mt-1 w-[200px]'>
                      
                        {/* Edit */}
                        <button className='h-[30px] w-[30px] flex justify-center items-center
                          transition-all duration-200
                          hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300
                        '>
                          <a href={`/?pasteId=${paste?._id}`}>
                            <FontAwesomeIcon icon={faPenToSquare} size="lg" className="text-black" />
                          </a>
                        </button>
                        
                        {/* View */}
                        <button className='h-[30px] w-[30px] flex justify-center items-center transition-all duration-200
                          hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300'>
                          
                          <Link to={`/pastes/${paste?._id}`}>
                            <FontAwesomeIcon icon={faEye} size="lg" className="text-black" />
                          </Link>

                        </button>

                        {/* delete */}
                        <button className='h-[30px] w-[30px] flex justify-center items-center transition-all duration-200
                          hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300' 
                          onClick={ () => handleDelete (paste?._id)}>
                          <FontAwesomeIcon icon={faTrashCan} size="lg" className="text-black" />
                        </button>

                        {/* Copy */}
                        <button className='h-[30px] w-[30px] flex justify-center items-center transition-all duration-200
                          hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300'
                          onClick={() =>{
                          navigator.clipboard.writeText(paste?.content)
                          toast.success("Copied to Clipboard")
                        }}> 
                          <FontAwesomeIcon icon={faClone} className="text-black text-lg" />
                        </button>

                        {/* Share */}
                        <button className='h-[30px] w-[30px] flex justify-center items-center transition-all duration-200
                          hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300'

                          onClick={() => handleShare(paste._id)}
                        >
                          <FontAwesomeIcon icon={faShare} size="lg" className="text-black" />
                        </button>
                      </div>
                      <div>
                        {new Date(paste.createdAt).toLocaleString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: false
                        }).replace(/:/g, ".")}
                      </div>
                        <div className='font-bold text-green-500'>
                          CODE
                        </div>
                    </div>
                  </div>
                  
                )
              }
                
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Paste


