const TertrieryButton = ({ children }) => {
  return (
    <button className="py-3 flex gap-2 text-center text-(--white) bg-(--blue) w-full items-center justify-center mt-5 hover:underline  hover:scale-103 transition-all duration-300">
      {children}
    </button>
  );
};

export default TertrieryButton;
