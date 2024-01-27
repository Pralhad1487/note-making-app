import { useState } from "react";
import "./App.css";

function App() {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [notes, setnotes] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [filteredNotes, setfilteredNotes] = useState([]);

  const addNote = (e) => {
    e.preventDefault();
    if(title=="") {
      alert("Title is required");
      return;
    }

    if(desc=="") {
      alert("Description is required");
      return;
    }

    setnotes([...notes, { title, desc }]);
    console.log(notes);
    settitle("");
    setdesc("");
  };

  const removeNote = (i) => {
    let copyNote = [...notes];
    copyNote.splice(i, 1);
    setnotes(copyNote);
  };

  const searchNote = (e)=>{
    let term = e.target.value;
    setsearchTerm(term);

    if (term !== "") {
      const filter = notes.filter((note) =>
        note.title.toLowerCase().trim().includes(term.toLowerCase().trim())
      );
      setfilteredNotes(filter);
    } else {
      setfilteredNotes([]);
    }
  }

  let renderNotes = notes;

  if(searchTerm !== ""){
    renderNotes = filteredNotes;
  }

  let renderItem = <p className="text-xl font-bold">Notes are not available!</p>
  if(notes.length>0){
    renderItem=renderNotes.map((e, i) => {
      return (
        <div
          key={i}
          className="noteBox m-3 text-black mx-7 p-5 border-2 border-slate-100"
        >
          <h1 className="text-xl font-bold">{e.title}</h1>
          <p>{e.desc}</p>
          <button className="flex justify-center items-center w-60"
            onClick={() => {
              removeNote(i);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mt-3 text-center rounded-full bg-red-600 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      );
    })
  }

  return (
    <div className="App">
      {/*--------Header start------*/}
      <div className="header flex justify-between bg-header font-bold px-4 py-6 text-white">
        <h1 className="text-2xl text-center ">Note Making App</h1>

        {/*-----Search functionality start----------*/}
        <div className="search flex justify-center items-center">
          <input
            className="rounded-sm w-40 h-7 p-3 text-black mr-2"
            type="text"
            placeholder="search notes"
            value={searchTerm}
            onChange={searchNote}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {/*-----Search functionality end-----*/}
      </div>
      {/*--------Header end------*/}

      {/*--------Form start------*/}
      <div className="form flex justify-center my-10 mx-10">
        <form>
          <input
            type="text"
            className="title mr-8 border-2 border-slate-200 rounded-sm px-3 py-2"
            placeholder="Enter title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
          <input
            type="text"
            className="desc mr-8 border-2 border-slate-200 rounded-sm px-3 py-2"
            placeholder="Enter description"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
          />
          <button
            onClick={addNote}
            className="btn text-white font-bold bg-sky-600 px-4 py-4 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </form>
      </div>
      {/*--------Form end--------*/}

      {/*--------Content start--------*/}
      <div className="content flex justify-center flex-wrap mx-4">
        {renderItem}
      </div>
      {/*--------Content end----------*/}
    </div>
  );
}

export default App;
