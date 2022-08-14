type cardProps = {
    classNames: string,
    children: any,
}

export const Card = (props: cardProps) => {
    const { classNames } = props;
    return <div className={classNames} > {props.children} </div>;
};

