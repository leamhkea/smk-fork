"use client";
import useArtworkStore from "@/store/kuratorStore";
import HeartIconInactive from "./HeartIconInactive";

const HeartIconSum = () => {
    const {gemteVaerker, vaerkSum}=useArtworkStore((state)=>state);

    return (
    <div className="relative">
        <HeartIconInactive/>
        {gemteVaerker.length>0&&(
            <span className="absolute -top-1 -right-1 bg-(--blue) text-(--white) rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {vaerkSum()}
            </span>
        )}
    </div> 
    );
}
 
export default HeartIconSum;