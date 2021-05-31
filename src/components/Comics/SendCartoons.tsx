import React, { useState, useEffect, FormEvent } from 'react';

import { Modal, ModalHeader, ModalBody, Form,	InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { MdSend } from 'react-icons/md';
import validator from 'validator';
import * as emailjs from 'emailjs-com';
import { toast } from 'react-toastify';

import ComicsProps from '../../inferfaces/Comics';
import '../../styles/components/sendCartoons.css';

function SendCartoons (props : any) {

	const [modal, setModal] = useState(false);
	const [email, setEmail] = useState("");
	const [mensagem, setMensagem] = useState("");

	
  const toggle = () => setModal(!modal);

	useEffect (() => {
		setModal(props.toggleModal);
		converterComicsEmMensagem(props.comicsSelecteds);
	}, [props]);

	function converterComicsEmMensagem (comicsSelecteds: ComicsProps[]) {
		let auxMensagem = "";

		comicsSelecteds.forEach((comic) => {
			auxMensagem += `
				Título: ${comic.title}\n
				Descrição: ${comic.description ? comic.description : "não consta"}\n
				Imagem (caminho): ${comic.thumbnail.path}.${comic.thumbnail.extension}
			`;
		});

		setMensagem(auxMensagem);
	}

	function handleSubmit (event: FormEvent) {
		event.preventDefault();

		if (validator.isEmail(email)) {
			emailjs.send("service_zpav4jg","template_s8amdut", {
				message: mensagem,
				to_email: email,
			}, process.env.REACT_APP_USER_KEY_EMAIL_API);
			toast.success("E-mail enviado com sucesso!");
			props.closeModal();
		} else {
			toast.error("Por favor, digite um e-mail válido!");
		}
	}

  return (
    <div>
      <Modal isOpen={modal} onClosed={() => props.closeModal()} size="md" toggle={toggle} id="sectionCartoonsEmail">
        <ModalHeader>Enviar quadrinhos por e-mail</ModalHeader>
        <ModalBody>
					<p>	Coloque seu e-mail para receber os dados dos quadrinhos que você selecionou! </p>
					<Form inline onSubmit={handleSubmit}>
						<InputGroup>
							<Input type="email" value={email} onChange={event => setEmail(event.target.value)} />
							<InputGroupAddon addonType="append">
								<Button type="submit"><MdSend /></Button>
							</InputGroupAddon>
						</InputGroup>
					</Form>
        </ModalBody>
      </Modal>
    </div>
  );

}

export default SendCartoons;
