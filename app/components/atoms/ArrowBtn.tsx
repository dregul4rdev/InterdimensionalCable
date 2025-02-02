
const ArrowDownBtn = ({onClick}:{onClick:Function}) => {

    return (
        <button onClick={()=> onClick()} className="py-2  grow rounded inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12  text-yellow-500 hover:text-yellow-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>)
}


const ArrowUpBtn = ({onClick}:{onClick:Function}) => {

    return (
        <button onClick={()=> onClick()} className="grow py-2 rounded inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-12 h-12  text-yellow-500 hover:text-yellow-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>

    </button>)
}
export {
    ArrowDownBtn,
    ArrowUpBtn
    
}