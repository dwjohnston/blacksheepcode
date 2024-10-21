
export function DatePublished(props: { date: string | Date, className?: string}) {

    const {className = '', date} = props;

    return <div className={`date-published ${className}`}>
        <i><span>Published:</span><time dateTime={new Date(date).toISOString()}>{new Date(date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</time></i>
    </div>

}