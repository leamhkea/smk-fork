import SecondaryButton from "@/components/global/buttons/SecondaryButton";
const OpretArrangement = () => {
    return ( <section className="flex flex-col gap-10 px-(--content-width)">
        <h1 className="thin">Opret arrangement</h1>
        <div className="flex flex-col">
        <label for="fname">Arrangement titel:</label>
        <input type="text" name="Arrangement titel" className="border-1 border-(--black) p-2"></input>
        </div>
        <div className="flex flex-col">
        <label for="fname">Beskrivelse:</label>
        <textarea name="Beskrivelse" className="border-1 border-(--black) p-2 h-50"></textarea>
        </div>
        <div className="flex flex-col">
        <label for="cars">Lokation:</label>
        <select name="lokation" id="lokation" className="border-1 border-(--black) p-2"> 
        <option value="kbh">København</option>
        <option value="aarhus">Aarhus</option>
        <option value="odense">Odense</option>
        </select>
        </div>
        <div className="flex flex-col">
        <label for="birthday">Dato:</label>
        <input type="date" id="dato" name="dato" className="border-1 border-(--black)"/>
        </div>
        <div className="flex flex-col">
        <label for="fname">Værk ID:</label>
        <input type="text" name="værk id" className="border-1 border-(--black) p-2"></input>
        </div>
        <div className="flex m-auto items-end">
        <SecondaryButton>Gem kladde</SecondaryButton>
        </div>
    </section> );
}
 
export default OpretArrangement;