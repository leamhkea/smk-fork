const Button = ({ children }) => {
  return (
    <button className="py-3 flex gap-2 text-center border-1 border-black w-full items-center justify-center mt-5 hover:underline">
      {children}
    </button>
  );
};

export default Button;
