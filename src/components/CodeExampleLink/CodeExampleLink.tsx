export function CodeExampleLink(props: {link: string, text?: string}) {
    const {link, text} = props;
    return <a href ={link}>{text ?? link}</a>
}