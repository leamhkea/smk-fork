import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-(--black) flex justify-between md:p-30 min-h-20 p-10 mt-20">
      <div className="flex flex-col gap-3">
        <h2 className="white thin">Gæst</h2>
        <h3 className="white">Åbningstider</h3>
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
        <h2 className="thin white">Ansat</h2>
        <ul>
          <li>
            <Link className="white" href="/sign-in">
              Log in
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};


export default Footer;