import React, { useEffect, useState } from "react";
import { OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { UpCircleArrow } from "../assets/icons/upCircleArrow";
import useWindowDimensions from "../util/dimensions";

type VirtualizedListProps = {
    numItems?: number,
    renderItem?: (props: any) => JSX.Element,
    data: dataType,
    windowHeight?: number
}
type dataType = {
    dataList: wordDataType[],
    loading: boolean,
    total: number,
}
type wordDataType = {
    name: string,
    acronym: string,
    id: number,
}

const VirtualizedList = (props: VirtualizedListProps) => {
    const { height, width } = useWindowDimensions();
    const { data } = props;
    const rowsPerPage = 5;
    const [itemHeight, setItemHeight] = useState<number>(41);
    const totalHeight = data.dataList.length * itemHeight;
    const [perPageHeight, setPerPageHeight] = useState<number>(250);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [dataoffset, setDataoffset] = useState<number>(20);
    const [visibledata, setVisibledata] = useState<dataType>({
        dataList: data.dataList.slice(0, dataoffset),
        loading: data.loading,
        total: data.total
    });

    let headerHeight: number = 4;
    const innerHeight = rowsPerPage * itemHeight;
    const startIndex = headerHeight + Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(rowsPerPage, Math.floor((scrollTop + innerHeight) / itemHeight));

    // const items = [];
    // for (let i = startIndex; i <= endIndex; i++) {
    //     items.push(
    //         renderItem({
    //             index: i,
    //             style: {
    //                 position: "absolute",
    //                 top: `${i * itemHeight}px`,
    //                 width: "100%"
    //             }
    //         })
    //     );
    // }

    const isEndOfPage = () => {
        console.log('entering');

        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            console.log(window.innerHeight, document.documentElement.scrollTop, document.documentElement.offsetHeight);

            return;
        }
        // more data to load
        console.log("scrolled to bottom");
    }

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        // console.log(window.scrollY);
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        const addRows = () => {
            console.log("scrollsY", window.scrollY);
            console.log(visibledata.dataList.length);
            
            if (window.scrollY > perPageHeight) {
                setVisibledata({
                    dataList: [...visibledata.dataList, ...data.dataList.slice(dataoffset, dataoffset + rowsPerPage)],
                    loading: data.loading,
                    total: data.total
                });
                setDataoffset(dataoffset + rowsPerPage);
                setPerPageHeight(perPageHeight + 150);
                // setPerPageHeight(perPageHeight + rowsPerPage * itemHeight);
            }
        }

        window.addEventListener("scroll", () => {
            addRows();
            toggleVisibility();
            isEndOfPage();
        });

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [dataoffset]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        setScrollTop(e.currentTarget.scrollTop);
        console.log('reachedOnScroll');

    }

    return (
        <div className="scroll" style={{ overflowY: "scroll", height: `${totalHeight}`, paddingLeft: '10px' }} onScroll={onScroll}>
            <Row>
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Word</th>
                            <th>Acronym</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data?.dataList?.map((key) => ( */}
                        {visibledata?.dataList?.map((key) => (
                            <tr key={key.acronym + key.id}>
                                <td>{key.id}</td>
                                <td align="center">{key.name}</td>
                                <td align="center">{key.acronym}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {isVisible && (
                    <OverlayTrigger
                        placement="top"
                        overlay={
                            <Tooltip id="button-tooltip-2">Scroll to Top</Tooltip>
                        }
                    >
                        {({ ref, ...triggerHandler }) => (
                            <button
                                className="scrollButton"
                                onClick={scrollToTop}
                                {...triggerHandler}
                                ref={ref}
                            >
                                <UpCircleArrow />
                            </button>
                        )}
                    </OverlayTrigger>
                )}
            </Row>
        </div >
    );
};

export default VirtualizedList;







{
    /* 
    <div className="scroll" style={{ overflowY: "scroll" }} onScroll={onScroll}>
    <div
        className="inner"
        style={{ position: "relative", height: `${innerHeight}px` }}
    >
        {items}
    </div>
    </div> 
    */
}