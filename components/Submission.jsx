import React, { useState } from 'react';

function Submission({text,setText}) {
  const [temp_text, setTempText] = useState('')
  function handleChange(e) {
    setTempText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setText(temp_text);
    setTempText('');
  }

  return (
    <form onSubmit={handleSubmit} className="py-10 flex-none grid items-center justify-items-left gap-2">
      <label className = "grid gap-4 mt-1">
        New Post:
        <input type="text" value={temp_text} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Submission;
