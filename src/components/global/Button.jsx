const Button = () => {
  return (
    <button className="py-3 flex gap-2 text-(--black) text-center rounded-4xl w-full items-center justify-center mt-5 hover:scale-105 transition-all duration-300">
      {children}
    </button>
  );
};

export default Button;
