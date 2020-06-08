import React, { useState } from "react";
import "./Converter.css";
import {
  Jumbotron,
  Button,
  Form,
  Col,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import ListCoins from "./ListCoins";
import axios from "axios";

function Converter() {
  const FIXER_URL =
    "http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3";

  const [value, setValue] = useState("");
  const [coinFrom, setCoinFrom] = useState("BRL");
  const [coinTo, setCoinTo] = useState("USD");
  const [showSpinner, setShowSpinner] = useState(false);
  const [formValidated, setFormValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resultConversion, setResultConversion] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  function handleValue(event) {
    setValue(event.target.value.replace(/\D/, ""));
  }

  function handleCoinFrom(event) {
    setCoinFrom(event.target.value);
  }

  function handleCoinTo(event) {
    setCoinTo(event.target.value);
  }

  function handleCloseModal(event) {
    setValue("");
    setCoinFrom("BRL");
    setCoinTo("USD");
    setFormValidated(false);
    setShowModal(false);
  }

  function converter(event) {
    event.preventDefault();
    setFormValidated(true);

    if (event.currentTarget.checkValidity() === true) {
      setShowSpinner(true);
      axios
        .get(FIXER_URL)
        .then((res) => {
          const quotation = getQuotation(res.data);
          if (quotation) {
            setResultConversion(
              `${value} ${coinFrom} = ${quotation} ${coinTo}`
            );
            setShowModal(true);
            setShowSpinner(false);
            setShowErrorMessage(false);
          } else {
            showError();
          }
        })
        .catch((err) => showError());
    }
  }

  function getQuotation(dataQuotation) {
    if (!dataQuotation || dataQuotation.success !== true) {
      return false;
    }

    const quotationFrom = dataQuotation.rates[coinFrom];
    const quotationTo = dataQuotation.rates[coinTo];
    const quotation = (1 / (quotationFrom * quotationTo)) * value;

    return quotation.toFixed(2);
  }

  function showError() {
    setShowErrorMessage(true);
    setShowSpinner(false);
  }

  return (
    <>
      <h1>Conversor de moedas</h1>
      <Alert variant="danger" show={showErrorMessage}>
        Erro obtendo dados de conversão, tente novamente.
      </Alert>
      <Jumbotron>
        <Form onSubmit={converter} noValidate validated={formValidated}>
          <Form.Row>
            <Col sm="3">
              <Form.Control
                placeholder="0"
                value={value}
                onChange={handleValue}
                required
              />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={coinFrom}
                onChange={handleCoinFrom}
              >
                <ListCoins />
              </Form.Control>
            </Col>
            <Col sm="1" className="text-center" style={{ paddingTop: "5px" }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control as="select" value={coinTo} onChange={handleCoinTo}>
                <ListCoins />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button
                variant="success"
                type="submit"
                data-testid="btn-converter"
              >
                <span className={showSpinner ? null : "hidden"}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={showSpinner ? "hidden" : null}>Converter</span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal} data-testid="modal">
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body>{resultConversion}</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseModal}>
              Nova conversão
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  );
}

export default Converter;
