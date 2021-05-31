import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import ComicsProps from '../../inferfaces/Comics';

import '../../styles/components/moreInfo.css';

const MoreInfo = (props: any) => {

  const [modal, setModal] = useState(false);
	const [data, setData] = useState<ComicsProps>();
	
  const toggle = () => setModal(!modal);

	useEffect (() => {
		setModal(props.toggleModal);
		setData(props.openComic);
	}, [props]);

  return (
    <div>
      <Modal isOpen={modal} onClosed={() => props.closeModal(undefined)} size="lg" toggle={toggle} id="moreInfo">
        <ModalHeader>{ data?.title }</ModalHeader>
        <ModalBody>
					<div className="f">
						<img src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`} alt={data?.title} className="comicImg" />
						<div className="f-c">
							<p>
								<strong>Escritor:</strong> 
								{' '}
								{ data?.creators.items ? data.creators.items.filter(item => item.role === "writer")[0] ? data.creators.items.filter(item => item.role === "writer")[0].name : "Escritor indisponível" : "Escritor indisponível" }
							</p>
							<p>
								<strong>Descrição:</strong> 
								{' '} 
								{ data?.description ? data.description : "Descrição indisponível" }
							</p>
						</div>
					</div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default MoreInfo;
