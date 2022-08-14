import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { Col, Modal, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./list.scss";
import { Card } from "../components/card";
import { CustomButton } from "../components/CustomButton";
import Loader from "../components/loader";
import { CustomInput } from "../components/CustomInput";
import { UpCircleArrow } from "../assets/icons/upCircleArrow";

type ListProps = {}
type wordDataType = {
    name: string,
    acronym: string,
    id: number,
}
type dataType = {
    dataList: wordDataType[],
    loading: boolean,
    total: number,
}

const List = (props: ListProps) => {
    const [show, setShow] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [data, setData] = useState<dataType>({
        dataList: [],
        loading: true,
        total: 1
    });

    const [wordData, setWordData] = useState<wordDataType>({
        name: "",
        acronym: "",
        id: 1,
    });

    useEffect(() => {
        document.title = 'Virtualized List';
        try {
            setData({ dataList: [], loading: true, total: 1 });

            const words: string = faker.random.words(10000);
            const objArr = words.split(" ").map((item, id) => ({
                name: item.toUpperCase(),
                id: id + 1,
                acronym: item.slice(0, 2).toLocaleUpperCase(),
            }));

            setData({ dataList: objArr, loading: false, total: objArr.length + 1 });
        } catch (e: any) {
            setData({ dataList: [], loading: false, total: 0 });
            console.log(e.error);
        }
    }, []);

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // const renderTooltip = (props) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         Simple tooltip
    //     </Tooltip>
    // );

    const handleShow = () => {
        setShow(!show);
        setWordData({ name: "", acronym: "", id: data.total });
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        let name = wordData.name;
        let acronym = wordData.acronym;
        let id = wordData.id;

        if (key === "name") {
            name = e.target.value;
        } else {
            acronym = e.target.value;
        }
        setWordData({ name: name, acronym: acronym, id: id });
    };

    const handleSave = () => {
        if (wordData.name) {
            setData({
                dataList: [...data.dataList, wordData],
                loading: false,
                total: wordData.id + 1,
            });
            setShow(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <React.Fragment>
            <div className="pageWrapper">
                <Row>
                    <Card classNames="align-end">
                        <Col md="10" align="center">
                            <div>
                                <h3>Virtualized List</h3>
                            </div>
                        </Col>
                        <Col md="2" align="end">
                            <CustomButton
                                text="Add new"
                                variant="secondary"
                                onClick={handleShow}
                            />
                        </Col>
                    </Card>
                </Row>
                {!data.loading ? (
                    data?.dataList ? (
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
                                    {data?.dataList.map((key) => (
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
                    ) : (
                        <div className="no-data">
                            <h5>
                                Click
                                <i color="blue" onClick={handleShow}>
                                    Add new
                                </i>
                                to add new row
                            </h5>
                        </div>
                    )
                ) : (
                    <Loader />
                )}
            </div>
            <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Word</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md="12">
                            <CustomInput
                                text="Type your Word"
                                onChange={(e) => handleInputChange(e, "name")}
                            />
                        </Col>
                        <Col md="6">
                            <CustomInput
                                text="Acronym"
                                onChange={(e) => handleInputChange(e, "acronym")}
                            />
                        </Col>
                        <Col md="6">
                            <CustomInput
                                text="Id"
                                disabled={true}
                                value={wordData.id}
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <CustomButton
                        text="Close"
                        variant="secondary"
                        onClick={handleClose}
                    />
                    <CustomButton
                        text="Save Changes"
                        variant="success"
                        onClick={handleSave}
                    />
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default List;
