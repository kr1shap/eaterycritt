

type bProp = {
  dest?: string;
  name: string;
  onClick?: () => void; 
  //add more later if needed
};

function Button(props:bProp) { 

    return (
            <button onClick={props.onClick ?? undefined} className=" rounded-[25px]
                border-[#6c6c6c] 
                    border-2 bg-[#fefff5]
                    text-gray-800
                    text-md
                    font-semibold
                    py-2 px-4
                    transform transition duration-300 ease-in-out hover:bg-[#f2f3eb] hover:translate-y-0.5
                    cursor-pointer"
            >
                {props.name ? props.name : "N/A"}
            </button>
    );
}

export default Button;