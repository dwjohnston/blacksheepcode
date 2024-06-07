import { ReactNode } from "react"

type ImageWithCaption = {
    image: ReactNode,
    caption?: string;
}

export function ImagePanel(props: {
    images: ImageWithCaption | Array<ImageWithCaption>;
}) {

    const images = Array.isArray(props.images) ? props.images : [props.images];



    return <div className="image-panel">
        {images.map((v) => {
            return <div className="image-panel-single">
                {v.image}
                <p className="image-panel-caption">{v.caption}</p>
            </div>
        })}

    </div>
}