import ReactQuill from "react-quill";

function RichTextEditor({
  newNote,
  mainNoteContent,
  newNoteContents,
  setNewNoteContents,
  setMainNoteContent,
}) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }, "code-block"],
      ["bold", "italic", "underline", "strike"],
      [{ script: "super" }, { script: "sub" }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["direction", { align: [] }],
      ["clean"],
    ],
  };

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <ReactQuill
      toolbarOptions={toolbarOptions}
      modules={modules}
      className="TET"
      id="my-form1"
      theme="snow"
      value={newNote === false ? mainNoteContent : newNoteContents}
      type="text"
      placeholder="Whats on your mind?"
      onChange={
        newNote
          ? (value) => setNewNoteContents(value)
          : (value) => setMainNoteContent(value)
      }
      style={{
        minHeight: "495px",
        height: "100%",
        width: "100%",
        outline: "none",
      }}
    />
  );
}

export default RichTextEditor;
