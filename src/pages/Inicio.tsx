import React, { useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ComicsProps from '../inferfaces/Comics';

import Header from '../components/Header';
import Wrapper from '../components/Comics/Wrapper';
import '../styles/pages/inicio.css';

function Inicio () {

	const [comics, setComics] = useState<ComicsProps[]>([]);
	const [total, setTotal] = useState(0);

	function handleUpdateData (data: any) {
		setComics(data.results);
		setTotal(data.total);
	}

	return (
		<div className="content-wrapper">
			<ToastContainer />
			{
				comics.length > 0 ?
					<Wrapper comics={comics} total={total}/>
				: <Header updateComics={(data: any) => handleUpdateData(data)} />
			}
		</div>
	);
}

export default Inicio;
