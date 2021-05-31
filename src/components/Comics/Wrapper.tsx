import React, { useState, useEffect } from 'react';

import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import { IoInformationCircleOutline, IoSquareOutline, IoCheckboxOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import WrapperProps from '../../inferfaces/Wrapper';
import ComicsProps from '../../inferfaces/Comics';

import Menu from './Menu';
import MoreInfo from './MoreInfo';
import SendCartoons from './SendCartoons';
import '../../styles/components/wrapper.css';

function Wrapper (props: WrapperProps) {

	const [allComics, setAllComics] = useState<ComicsProps[]>([]);
	const [openComic, setOpenComic] = useState<ComicsProps>();
	const [comicsSelecteds, setComicsSelecteds] = useState<ComicsProps[]>([]);
	const [sendCartoons, setSendCartoons] = useState(false);
	const [total, setTotal] = useState(0);
	const [posicaoPaginacao, setPosicaoPaginacao] = useState(0);

	useEffect (() => {
		setAllComics(props.comics);
		setTotal(props.total);
	}, [props]);

	useEffect (() => {
		console.log(posicaoPaginacao);
	}, [posicaoPaginacao]);

	function handleSelectComic (comic: ComicsProps) {
		let auxComicsSelecteds = comicsSelecteds;

		if (comicsSelecteds.filter(c => c.id === comic.id).length > 0) {
			auxComicsSelecteds = auxComicsSelecteds.filter(c => c.id !== comic.id);
		} else {
			auxComicsSelecteds.push(comic);
		}

		setComicsSelecteds([...auxComicsSelecteds]);
	}

	function checkIfTheComicIsSelected (comic: ComicsProps) {
		let aux = comicsSelecteds.filter(c => c.id === comic.id);
		return aux.length > 0 ? true : false;
	}

	return (
		<div>
			<Jumbotron>
        <Container>
					<Menu posicaoPaginacao={posicaoPaginacao} updateComics={(data: ComicsProps[]) => setAllComics(data)} />
					<br />
					<Row>
						{	
							allComics.map(comic => 
								<Col sm={4} md={3} key={comic.id}> 
									<div className="wrapperThumb">
										<div className="optionsThumb">
											<Button color="link" onClick={() => handleSelectComic(comic)}> 
												{
													checkIfTheComicIsSelected(comic) ? 
														<IoCheckboxOutline size="2em" />
													: <IoSquareOutline size="2em" />
												}
											</Button>
											<Button color="link" onClick={() => setOpenComic(comic)}><IoInformationCircleOutline size="2em" /></Button>
										</div>
										<img 
											src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
											alt={comic.title} 
											className="cartoonThumb"
										/> 
									</div>
								</Col> 
							)
						}
					</Row>
					{
						total > 0 ?
							<Row>
								<div className="f-c">
									<Button disabled={(posicaoPaginacao - 20) < 0} onClick={event => setPosicaoPaginacao(posicaoPaginacao - 20)}><FaChevronLeft /> Anterior</Button>
									<Button disabled={(posicaoPaginacao + 20) > total} onClick={event => setPosicaoPaginacao(posicaoPaginacao + 20)}>Próxima <FaChevronRight /> </Button>
								</div>
							</Row>
						: null
					}
				</Container>
				{
					comicsSelecteds.length > 0 ?
						<Button id="btnEnviarEmail" onClick={() => setSendCartoons(true)}>{comicsSelecteds.length} quadrinho{comicsSelecteds.length === 1 ? " selecionado" : "s selecionados"}</Button>
					: null
				}
      </Jumbotron>
			<MoreInfo toggleModal={openComic?.id ? true : false} openComic={openComic} closeModal={(data: ComicsProps) => setOpenComic(data)} />
			<SendCartoons toggleModal={sendCartoons} comicsSelecteds={comicsSelecteds} closeModal={() => setSendCartoons(false)} />
		</div>
	); 
}

export default Wrapper;
