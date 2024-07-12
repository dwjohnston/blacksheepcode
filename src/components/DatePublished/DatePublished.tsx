
export function DatePublished(props: {date: string | Date}) {

    return <div>
         <i className="date-published">Published: <time dateTime={new Date(props.date).toISOString()}>{new Date(props.date).toLocaleDateString(undefined, {day: 'numeric', month: 'long', year:'numeric'})}</time></i>
     </div>
  
}