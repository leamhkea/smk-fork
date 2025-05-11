const SingleVaerkBeskrivelse = ({art}) => {
    return ( 
        <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
        <h2>Værk</h2>
        <div className="flex gap-1">
            <p className="bold">Kunstværkets titel |</p>
            <p>{art.titles?.[0]?.title || "Ingen titel"}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Udgivelsesdato |</p>
            <p>{art.acquisition_date_precision}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Type |</p>
            <p>{art.object_names[0]?.name}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Teknik |</p>
            <p>{art.techniques}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Materiale |</p>
            <p>{art.materials}</p>
        </div>
        <div className="flex flex-col">
            <p className="bold">Værkbeskrivelse |</p>
            <p>{art.content_description?.[0] || "Værket har ingen beskrivelse"}</p>
            <p>{art.content_description?.[1]}</p>
        </div>
        <div className="flex flex-col">
            <p className="bold">Litterær reference |</p>
            <p>{art.literary_reference?.[0] || "Værket har ingen litterær reference"}</p>
        </div>
        </div>
        <div className="flex flex-col gap-1">
        <h2>Kunstner</h2>
        <div className="flex gap-1">
            <p className="bold">Kunstnerens navn |</p>
            <p>{art.artist}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Kunstnerens fødsel |</p>
            <p>{art.production[0]?.creator_date_of_birth}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Kunstnerens død |</p>
            <p>{art.production[0]?.creator_date_of_birth}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Kunstnerens nationalitet |</p>
            <p>{art.production[0]?.creator_nationality}</p>
        </div>
        <div className="flex gap-1">
            <p className="bold">Kunstnerens køn |</p>
            <p>{art.production[0]?.creator_gender}</p>
        </div>
        </div>
        <div className="flex flex-col gap-1">
            <h2>Udstillingsinformationer</h2>
            <div className="flex gap-1">
            <p className="bold">Ansvarlig afdeling |</p>
            <p>{art.responsible_department}</p>
            </div>
            <div className="flex gap-1">
            <p className="bold">Udstillingslokation |</p>
            <p>{art.current_location_name}</p>
            </div>
            <div className="flex gap-1">
            <p className="bold">Overtagelsesdato |</p>
            <p>{art.acquisition_date_precision}</p>
            </div>
        </div>
      </div> );
}
 
export default SingleVaerkBeskrivelse;