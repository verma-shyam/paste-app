import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { faClone } from '@fortawesome/free-regular-svg-icons'
import Editor from "@monaco-editor/react";
import toast from 'react-hot-toast';
import {createPaste,viewPaste,deletePaste,updatePaste} from "../redux/pasteSlice";

const Home = () => {
    const[title,setTitle] = useState('');
    const[value,setValue] = useState('');
    const[copied, setCopied] = useState(false);
    const[searchParam, setSearchParams] = useSearchParams();
    const pasteId = searchParam.get("pasteId");
    const dispatch = useDispatch();
    const allPaste =useSelector((state) => state.paste.pastes);

    useEffect(() => {
      dispatch(viewPaste());
    }, []);

    useEffect(() => {
        if(pasteId && allPaste.length > 0){
          const paste = allPaste.find((p) => p._id === pasteId);
          if(paste){
            setTitle(paste.title);
            setValue(paste.content);
          }
        }
        }, [pasteId, allPaste])

      function handleSubmit() {

        if (!title.trim() || !value?.trim()) {
          alert("Title and Content are required!");
          return;
        }

        if (pasteId) {
          dispatch(
            updatePaste({
              id: pasteId,
              data: { title, content: value }
            })
          );
        } else {
          dispatch(
            createPaste({
              title,
              content: value
            })
          );
        }

        setTitle("");
        setValue("");
        setSearchParams({});
      }

  return (
    <div className=' mt-2 rounded-xl min-w-[700px]'>
      <div>
        <div className='flex flex-row gap-7 justify-between justify-center mt-2 h-[3rem]'>
          <input
            className='p-2 rounded mt-2 w-[80%] text-black font-semibold border border-gray-500'
            type='text'
            placeholder='Enter Title Here'
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
        <button
          onClick={handleSubmit} 
          className='p-2 rounded mt-2 bg-blue-600 text-white transition-all duration-200 active:text-red-500 active:scale-110'>
          {
              pasteId ? "Update" : "Create"
          }
        </button>
        </div>
        <div className='mt-2 border border-black rounded'>
          <div className='w-[100%] flex items-center justify-between h-6 p-2 border-b border-black'>
            <div className='mb-[3px] space-x-1 '>
              <FontAwesomeIcon icon={faCircle} className="text-red-600" />
              <FontAwesomeIcon icon={faCircle} className="text-yellow-400" />
              <FontAwesomeIcon icon={faCircle} className="text-green-600" />
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied successfully ✅");
                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 1000); // back to normal after 1 second
              }}
              className={`flex items-center justify-center h-4 w-6 rounded 
              ${copied ? "bg-green-300" : ""} border-none border-white hover:scale-110
                          active:scale-125
                          hover:bg-green-500
                          active:bg-blue-300`}
            >
              <FontAwesomeIcon icon={faClone} className="text-black text-sm" />
            </button>
          </div>
          <Editor
            height="60vh"
            defaultLanguage="javascript"
            value={value}
            onChange={(val) => setValue(val)}
            theme="vs-light"
            options={{
              wordWrap: "on",
              lineNumbers: "on",
              automaticLayout: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home
