const SecondaryButton = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick} // sørger for at onclick er mulig på enklete sider uden at definere det på hver button
      disabled={disabled} //sørger for at titlen i button kan ændre sig når knappen er igang med at loade
      className="py-3 px-2 flex gap-2 text-center border-1 border-(--black) w-full items-center justify-center mt-5 hover:underline hover:scale-103 transition-all duration-300"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
