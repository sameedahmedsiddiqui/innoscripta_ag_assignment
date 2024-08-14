import { Bounce, toast } from "react-toastify";

interface FormatArticleDateProps {
    date: Date
}


const formatArticleDate = (props: FormatArticleDateProps) => {
    const {date} = props
    const articleDate = new Date(date);
    const now = new Date();
    
    const diff = now.getTime() - articleDate.getTime();
    
    const diffInHours = diff / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
        return `${Math.floor(diffInHours)} hours ago`;
    } else {
        return articleDate.toDateString();
    }
}

const errorPop = (msg: string) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
}

const successPop = (msg: string) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  })
}

export {
    formatArticleDate,
    errorPop,
    successPop
}