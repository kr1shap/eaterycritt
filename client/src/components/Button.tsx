import { Link } from 'react-router';


type bProp = {
  dest?: string;
  name: string;
  onClick?: () => void; 
  //add more later if needed
};

function Button(props:bProp) { 

    return (
        <Link to={props.dest ? props.dest : "/"} viewTransition>
            <button onClick={props.onClick ?? undefined} className="font-medium rounded-[25px]
                border-amber-900 
                    border-2 bg-[#fdffe7]
                    text-gray-800
                    text-md
                    py-2 px-4
                    transform transition duration-300 ease-in-out hover:bg-[#e2e6b7] hover:translate-y-0.5
                    cursor-pointer"
            >
                {props.name ? props.name : "N/A"}
            </button>
        </Link>
    );
}

export default Button;