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

export {
    formatArticleDate
}