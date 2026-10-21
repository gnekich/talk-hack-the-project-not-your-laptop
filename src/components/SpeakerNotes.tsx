function SpeakerNotes({
  noteString,
  children,
}: {
  noteString?: string;
  children?: React.ReactNode;
}) {
  return <aside className="notes"> {noteString ? noteString : children}</aside>;
}

export default SpeakerNotes;
