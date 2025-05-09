const Footer = () => {
  return <div className="bg-(--black) flex justify-between md:p-30 p-10">
      <div className="flex flex-col gap-3">
        <h3 className="white">Gæst</h3>
        <h3 className="thin white">Åbningstider</h3>
        <ul>
        <div className="flex gap-10">
        <li><p className="white">Tirsdag - søndag</p></li>
        <li><p className="white">10 - 18</p></li>
        </div>
        <div className="flex justify-between">
          <li><p className="white">Onsdag</p></li>
          <li><p className="white">10 - 20</p></li>
        </div>
        <div className="flex justify-between">
          <li><p className="white">Mandag</p></li>
          <li><p className="white">Lukket</p></li>
        </div>
      </ul>
    </div>
    <div className="flex flex-col gap-3">
      <h3 className="white">Ansat</h3>
      <ul>
        <li>
          <a className="white" href>Log in</a>
        </li>
      </ul>
    </div>
  </div>;
};

export default Footer;
