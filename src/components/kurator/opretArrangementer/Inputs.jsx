import SecondaryButton from "@/components/global/buttons/SecondaryButton";
import TertrieryButton from "@/components/global/buttons/TertrieryButton";
const Inputs = ({events}) => {

    return (
    <div className="flex flex-col gap-10">

        <h1 className="thin">Opret arrangement</h1>

        <div className="flex flex-col">
        <label for="text">Arrangement titel:</label>
        <input type="text" name="Arrangement titel" className="border-1 border-(--black) p-2"></input>
        </div>

        <div className="flex flex-col">
        <label for="text">Beskrivelse:</label>
        <textarea name="Beskrivelse" className="border-1 border-(--black) p-2 h-50"></textarea>
        </div>

        <div className="flex flex-col">
        {/* Indsæt Leas filtrering, men med lokationer */}
        <label for="locations">Lokation:</label>
        <select name="lokation" id="lokation" className="border-1 border-(--black) p-2"> 
        <option value="kbh">København</option>
        <option value="aarhus">Aarhus</option>
        <option value="odense">Odense</option>
        </select>

        </div>
        <div className="flex flex-col">
        <label for="dates">Dato:</label>
        <input type="date" id="dato" name="dato" className="border-1 border-(--black) p-2"/>
        </div>

        {/* skal kunne konvertere input til at lave forskellige strings i arrayet - evt. med splice? */}
        <div className="flex flex-col">
        <label for="object_number">Inventarnummer:</label>
        <input type="text" name="object_number" placeholder="Eksempel: KKSgb18, KKS1997-4" className="border-1 border-(--black) p-2"></input>
        </div>

        <div className="flex justify-center gap-10">
            <div>
            <SecondaryButton>Gem kladde</SecondaryButton>
            </div>

            <div>
            <TertrieryButton>Publicer arrangement</TertrieryButton>
            </div>
        </div>

    </div> );
}
 
export default Inputs;