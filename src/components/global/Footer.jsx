const Footer = () => {
  return <div className="bg-(--black) flex justify-between md:p-30 p-10">
      <div className="flex flex-col gap-3">
        <h3>Gæst</h3>
        <h3 className="thin">Åbningstider</h3>
        <ul>
        <div className="flex gap-10">
        <li><p>Tirsdag - søndag</p></li>
        <li><p>10 - 18</p></li>
        </div>
        <div className="flex justify-between">
          <li><p>Onsdag</p></li>
          <li><p>10 - 20</p></li>
        </div>
        <div className="flex justify-between">
          <li><p>Mandag</p></li>
          <li><p>Lukket</p></li>
        </div>
      </ul>
    </div>
    <div className="flex flex-col gap-3">
      <h3>Ansat</h3>
      <ul>
        <li>
          <a href>Log in</a>
        </li>
      </ul>
    </div>
  </div>;
};

export default Footer;
