import * as utils from '../utils/dateFormatting'

const Comment = ({comment}) => {  
    const getDateCreated = (date) => {
        const millisecondsIn24Hours = (24 * 60 * 60 * 1000)

        const commentDate = new Date(date)
        const currentDate = new Date()

        if (utils.timeAgo(commentDate, currentDate) <= millisecondsIn24Hours) {
            // within the last 24 hours
            date = utils.formatDate(commentDate, 'recently')
        } else if (currentDate.getFullYear() === commentDate.getFullYear()) {
            // within the last year
            date = utils.formatDate(commentDate, 'thisYear')
        } else if (currentDate.getFullYear() > commentDate.getFullYear()) {
            // prior to this year
            date = utils.formatDate(commentDate)
        }
    
        return date
    }

    return (
        <article className="comment">
            <p className="comment__message">{comment.message}</p>
            <div className="comment__author">
                <span>{comment.name}</span> on <span>{getDateCreated(comment.created)}</span>
            </div>
        </article>
    )
}

export default Comment