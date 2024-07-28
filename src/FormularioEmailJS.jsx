// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ModalFormulario from './ModalFormulario';
import './ContactUs.css';

const FormularioEmailJS = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Nombre requerido';
    } else if (values.name.length > 30) {
      errors.name = 'Debe tener 30 caracteres o menos';
    }

    if (!values.email) {
      errors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Dirección de correo inválida';
    }

    if (!values.subject) {
      errors.subject = 'Asunto requerido';
    } else if (values.subject.length > 40) {
      errors.subject = 'Debe tener 40 caracteres o menos';
    }

    if (!values.message) {
      errors.message = 'Mensaje requerido';
    } else if (values.message.length > 300) {
      errors.message = 'Debe tener 300 caracteres o menos';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setShow(true);
    }
  };

  return (
    <>
      <Form id="contactForm" onSubmit={handleSubmit}>
        {/* Nombre y Correo */}
        <Row>
          <Col sm={6}>
            <Form.Group controlId="formName">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre y Apellido"
                value={formValues.name}
                onChange={handleChange}
                isInvalid={!!formErrors.name}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="formEmail">
              <Form.Label></Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
                isInvalid={!!formErrors.email}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Asunto del correo */}
        <Row>
          <Col sm={12}>
            <Form.Group controlId="formSubject">
              <Form.Label></Form.Label>
              <Form.Control
                type="text"
                name="subject"
                placeholder="Asunto"
                value={formValues.subject}
                onChange={handleChange}
                isInvalid={!!formErrors.subject}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.subject}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Mensaje del correo */}
        <Row>
          <Col sm={12} className="mb-3">
            <Form.Group controlId="formMessage">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                placeholder="Escriba su Mensaje, por favor"
                value={formValues.message}
                onChange={handleChange}
                isInvalid={!!formErrors.message}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">{formErrors.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        {/* Boton de enviar */}
        <Row>
          <Col sm={12} className="d-flex justify-content-center">
            <Button type="submit" value="Enviar" className="colorBoton">
              Enviar
              <i className="bi bi-send btn iconoEnviar" />
            </Button>
            {show && (
              <ModalFormulario
                show={show}
                onHide={() => setShow(false)}
                formValues={formValues}
                setShow={setShow}
                setIsSubmitting={setIsSubmitting}
                setFormValues={setFormValues}
              />
            )}
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default FormularioEmailJS;
