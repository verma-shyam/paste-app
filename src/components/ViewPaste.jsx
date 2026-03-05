import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { createPaste, deletePaste } from '../redux/pasteSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faClone } from '@fortawesome/free-regular-svg-icons'
import { viewPaste } from "../redux/pasteSlice";
import toast from 'react-hot-toast';

const ViewPaste = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  //  FETCH DATA
  useEffect(() => {
    dispatch(viewPaste());
  }, [dispatch]);

  const allPaste = useSelector((state) => state.paste.pastes);

  // USE find INSTEAD OF filter
  const paste = allPaste.find((p) => p._id === id);

  console.log("Final Paste: ", paste);

  //  SAFE CHECK
  if (!paste) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='flex flex-row gap-7'>
        <input
          className='p-1 rounded mt-2 min-w-[700px] place-content-between font-bold'
          type='text'
          placeholder='Enter Title Here'
          value={paste.title}
          disabled
          onChange={(e)=>setTitle(e.target.value)}
        />
      {/* <button
        onClick={createPaste} 
        className='p-2 rounded-2xl mt-2'>
        {
            pasteId ? "Update" : "Create"
        }
      </button> */}


      </div>
      <div className='mt-6 rounded border border-black w-[700px]'>
        <div className='flex justify-between w-[700px] border-b border-black'>
          <div>
            <FontAwesomeIcon icon={faCircle} className="text-red-600" />
            <FontAwesomeIcon icon={faCircle} className="text-yellow-400" />
            <FontAwesomeIcon icon={faCircle} className="text-green-600" />
          </div>
          
          <button
            className='flex items-center justify-center h-3 w-2 rounded border-none border-white mt-[3px] mr-1 hover:scale-110
                        active:scale-100
                        hover:bg-green-500
                        active:bg-blue-300'
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(paste.content);
                toast.success("Copied successfully ✅");
              } catch (err) {
                toast.error("Copy failed ❌");
              }
            }}
          >
            <FontAwesomeIcon icon={faClone} className="text-black text-sm" />
          </button>


        </div>
        <textarea
          className='rounded mt-4, min-w-[700px] p-4'
          value={paste.content}
          placeholder='Enter The Content'
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
