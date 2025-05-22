import * as motion from "motion/react-client";

export default function EnterAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      style={omArrangement}
    />
  );
}

/**
 * ==============   Styles   ================
 */

const omArrangement = {
  width: 100,
  height: 100,
  backgroundColor: "#5686F5",
  borderRadius: "50%",
};
