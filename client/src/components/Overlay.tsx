import { motion } from "framer-motion";
import ReviewForm from "./ReviewForm";
import type { User } from "../schema/schema";

interface fProp {
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  user: User | undefined | null;
}

function Overlay(props: fProp) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-50 ease-in-out transition-colors">
        <button
          onClick={props.onClose}
          className="absolute top-2 right-3 text-purple-100 hover:text-purple-200/80 ease-in-out text-xl extraSmall:text-2xl font-bold"
        >
          &times;
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.01 }}
          transition={{
            type: "spring",
            stiffness: 99,
            damping: 20,
            mass: 0.5,
          }}
        >
          <ReviewForm
            onSubmit={async (rating, comment) => {
              try {
                await props.onSubmit(rating, comment); 
                props.onClose(); 
              } catch (err) {
                console.error("Error submitting review:", err);
                alert("Could not submit review. Please try again.");
              }
            }}
            user={props.user}
          />
        </motion.div>
      </div>
    </>
  );
}

export default Overlay;
