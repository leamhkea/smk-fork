import { SignOutButton } from "@clerk/nextjs";
const SideMenu = () => {

    return ( <div className="absolute bg-(--white) shadow-md p-10 right-3 top-20 px-(--content-width)">
        <ul className="flex flex-col gap-5">
            <li>
                <a href="/profil">Min Profil</a>
                <hr/>
                </li>
            <li><a href="/arrangementer">Mine kladder</a></li>
            <li><a href="/opretarrangement">Opret nyt arrangement</a></li>
            <li>Værkarkiv</li>
            <li>
            <hr className="mb-2"/>
                <SignOutButton/></li>
        </ul>
    </div> );
}
 
export default SideMenu;