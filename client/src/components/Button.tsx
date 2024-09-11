import Right from "../../public/assets/Right.svg"

const Button = ({ text, image }: {text: string, image?: boolean}) => {
    return (
        <div>
            <button className="btn">
                {text} 
                {image && 
                    <img src={Right} alt="right arrow" />
                }
            </button>
        </div>
    )
}

export default Button