
const Username = ({ fullName, setFullName }) => {
  return (
    <div className="username_input">
      <label>Ism va familiya</label>
      <input
        type="text"
        placeholder="Ism familyangizni kiriting"
        className="username-input"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
    </div>
  );
};

export default Username;

