const Footer = () => {
  return (
    <div className="bg-(--black) flex justify-between md:p-30 p-10 mt-20">
      <div className="flex flex-col gap-3">
        <h3 className="white">Gæst</h3>
        <h3 className="thin white">Åbningstider</h3>
        <ul className="flex flex-col gap-2">
          <li className="flex gap-10">
            <p className="white">Tirsdag - søndag</p>
            <p className="white">10 - 18</p>
          </li>
          <li className="flex justify-between">
            <p className="white">Onsdag</p>
            <p className="white">10 - 20</p>
          </li>
          <li className="flex justify-between">
            <p className="white">Mandag</p>
            <p className="white">Lukket</p>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="white">Ansat</h3>
        <ul>
          <li>
            <a className="white" href="/sign-in">
              Log in
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Footer;