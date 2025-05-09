import { SignedIn } from "@clerk/nextjs";
const Kladder = () => {
    return (<div>
        <SignedIn>
        <p>Velkommen tilbage!</p>
      </SignedIn>
    </div>  );
}
 
export default Kladder;