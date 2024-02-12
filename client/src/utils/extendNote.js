export const extendNote = (note) => {
  if (Number(note)) {
    return note;
  } else {
    const realNote = note.toUpperCase().charCodeAt(0) - 55;
    return JSON.stringify(realNote);
  }
};
