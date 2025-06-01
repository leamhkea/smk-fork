const SecondaryButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-3 px-4 flex gap-2 text-center border-1 text-(--blue) border-(--blue) items-center w-full justify-center mt-5 hover:underline  hover:scale-103 transition-all duration-300"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
