import './emoji.css';

const Emoji = (): JSX.Element => {
  return (
    <div className="emoji-btn">
      <div className="eyes">
        <div className="left-eye">.</div>
        <div className="right-eye">.</div>
      </div>
      <div className="mouth"></div>
    </div>
  );
}

export default Emoji;