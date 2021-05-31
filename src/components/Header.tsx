import React, { useState, FormEvent } from 'react';

import { Input, Button, InputGroup, InputGroupAddon, Form } from 'reactstrap';
import { FaChevronRight } from "react-icons/fa";
import { toast } from 'react-toastify';

import api from '../services/api';
import '../styles/components/header.css';

function Header (props: any) {

	const [search, setSearch] = useState("");

	function handleSubmit (event: FormEvent) {
		event.preventDefault();
		if (search.length >= 3) {
			api.get("comics", {
				params: {
					titleStartsWith: search,
					apikey: process.env.REACT_APP_ACCESS_KEY_MARVEL_API
				}
			}).then(response => {
				if (response.data.data.total === 0) {
					toast.info("Não encontramos nenhum cartoon com este nome!");
				}
				props.updateComics(response.data.data);
			}).catch(error => {
				toast.error(error);
			});
		} else {
			toast.error("Digite ao menos 3 letras!");
		}
	}

	return (
		<div id="header">	
			<div className="z-1"></div>
			<div className="z-2">
				<header>
					<h1>cartOOns</h1>
					<p>Pesquise por quadrinhos a qualquer momento!</p>
				</header>
				<Form onSubmit={handleSubmit}>
					<InputGroup>
						<Input value={search} bsSize="lg" onChange={event => setSearch(event.target.value)} placeholder="Hulk, Spiderman..." />
						<InputGroupAddon addonType="append"><Button type="submit" size="lg" color="danger">Pesquisar <FaChevronRight /></Button></InputGroupAddon>
					</InputGroup>	
				</Form>
			</div>
		</div>
	);
}

export default Header;
