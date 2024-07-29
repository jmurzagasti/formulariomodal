import React, { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './ContactUs.css';

// eslint-disable-next-line react/prop-types
const ModalFormulario = ({ show, onHide, formValues, setShow, setIsSubmitting, setFormValues }) => {
  //const navegar = useNavigate();
  const goTo = () => {
    onHide();
    // navegar('/');
  };

  useEffect(() => {
    console.log(show);
    if (show) {
      const sendEmail = () => {
        setIsSubmitting(true);
        emailjs
          .sendForm(
            import.meta.env.VITE_VERSION_ID,
            import.meta.env.VITE_TEMPLATE_ID,
            '#contactForm',
            import.meta.env.VITE_PUBLIC_KEY
          )
          .then(
            (result) => {
              console.log(result.text);
              setIsSubmitting(false);
              setFormValues({ name: '', email: '', subject: '', message: '' });
              setShow(false);
              console.log(show);
            },
            (error) => {
              console.log(error.text);
              alert('Hubo un error, por favor intenta de nuevo.');
              setIsSubmitting(false);
              setShow(false);
            }
          );
      };
      sendEmail();
    }
  }, [show, formValues, setShow, setIsSubmitting, setFormValues]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="headerColor">
        <Modal.Title>¡Correo Enviado!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fw-semibold">Tu consulta se ha enviado correctamente.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={goTo} className="colorBoton">
          Volver a Inicio
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFormulario;
