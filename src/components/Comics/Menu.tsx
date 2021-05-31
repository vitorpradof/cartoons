import React, { useState, FormEvent } from 'react';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, Form, FormGroup, Input, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';

import api from '../../services/api';
import icone from '../../images/icon.jpg';
import '../../styles/components/menu.css';

function Menu (props: any) {
  const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");

  const toggle = () => setIsOpen(!isOpen);

	function handleSubmit (event: FormEvent) {
		event.preventDefault();
		if (search.length >= 3) {
			api.get("comics", {
				params: {
					titleStartsWith: search,
					offset: props.posicaoPaginacao,
					apikey: process.env.REACT_APP_ACCESS_KEY_MARVEL_API
				}
			}).then(response => {
				setSearch("");
				props.updateComics(response.data.data.results);
			}).catch(error => {
				toast.error(error);
			});
		} else {
			toast.error("Digite ao menos 3 letras!");
		}
	}

  return (
		<Navbar expand="md" id="sectionMenu">
			<NavbarBrand href="/"> <img src={icone} height="50" alt="Logo da cartOOns"/> cartOOns</NavbarBrand>
			<NavbarToggler onClick={toggle} />
			<Collapse isOpen={isOpen} navbar>
				<Nav className="mr-auto" navbar></Nav>
				<Form inline onSubmit={handleSubmit}>
					<FormGroup>
						<InputGroup>
							<Input type="text" value={search} onChange={event => setSearch(event.target.value)} />
							<InputGroupAddon addonType="append">
								<Button type="submit"><FaSearch /></Button>
							</InputGroupAddon>
						</InputGroup>
					</FormGroup>
				</Form>
			</Collapse>
		</Navbar>
  );
}

export default Menu;
