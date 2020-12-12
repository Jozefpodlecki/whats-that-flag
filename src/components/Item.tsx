import { Country } from "models/Country";
import React, { CSSProperties, FunctionComponent, useEffect, useRef, useState } from "react";
import styles from "./item.scss";

type Props = Country & { onClick(): void; };

const Item: FunctionComponent<Props> = ({
    onClick,
    countryName,
    flagImageUrl,
    flagSvgUrl,
    "iso3166-1-alpha-2": is3166alpha2,
}) => {
    const [isHovering, setHover] = useState(false);
    const [style, setStyle] = useState<CSSProperties>({
        transform: isHovering ? `scale(1.1) ` : null,
        filter: isHovering ? `brightness(0.6)` : null,
        opacity: 0,
        zIndex: -1,
    });
    const itemRef = useRef<HTMLDivElement>();

    useEffect(() => {
        const element = itemRef.current;
        const { height, width } = element.getBoundingClientRect();
        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext("2d");
        
            context.drawImage(image, 0, 0, width, height);
            const url = canvas.toDataURL("image/jpeg");

            setStyle(state => ({
                ...state,
                height: height,
                width: width,
                backgroundImage: `url(${url})`,
                opacity: 1,
            }))
        };
        image.src = flagSvgUrl;
        
    }, [])

    useEffect(() => {
        const onResize = () => {
            const element = itemRef.current;
            const { height, width } = element.getBoundingClientRect();
            const image = new Image();
            image.onload = function() {
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const context = canvas.getContext("2d");
            
                context.drawImage(image, 0, 0, width, height);
                const url = canvas.toDataURL("image/jpeg");
    
                setStyle(state => ({
                    ...state,
                    height: height,
                    width: width,
                    backgroundImage: `url(${url})`,
                    opacity: 1,
                }))
            };
            image.src = flagSvgUrl;
        }

        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    const onMouseEnter = () => {
        setStyle(state => ({
            ...state,
            transform: `scale(1.1) `,
            filter: `brightness(0.6)`,
        }))
        setHover(true)
    }

    const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        setStyle(state => ({
            ...state,
            transform: null,
            filter: null,
        }))
        setHover(false)
    }

    return <div
        ref={itemRef}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        key={is3166alpha2}
        className={styles.item}>
        <div className={styles.backgroundWrapper}>
            <div className={styles.background} style={style}/>
        </div>
        <span 
            style={{
                opacity: isHovering ? 1 : 0,
            }}
            className={styles.text}>{countryName}</span>
</div>
};

export default Item;