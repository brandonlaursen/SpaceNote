function CreateNotebook({
  darkMode,
  createNotebookSubmit,
  title,
  updateTitle,
  errors,
}) {
  return (
    <div className={darkMode ? "createModalDark" : "createModal"}>
      <h1>Create Notebook</h1>
      <form onSubmit={createNotebookSubmit} id="my-form">
        <input
          className="CreateInput1"
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle}
          maxLength="25"
          minLength="1"
        />
      </form>
      <button type="submit" form="my-form" className="CreateNoteButton">
        Create
      </button>
      <ul className="errors">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}

export default CreateNotebook;
