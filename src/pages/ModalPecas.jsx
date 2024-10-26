import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Table, Button, Input } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function ModalPecas({ children, peca='Peça', recebePeca }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      width: 150,
      render: (value) => {
        return (
          value.toFixed(2)
        )
      }
    },
    {
      title: '',
      width: 150,
      render: (_,row) => {
        return (
          <Button onClick={() => {selecionaPeca(row)}}
            color='primary'>
            Adicionar Peça
          </Button>
        )
      }
    }
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPecas();
    }, 1000)

    return () => {clearTimeout(timeout);};
  },[pesquisa]);

  const modal = e => {
    e.stopPropagation();
    setVisible(true);
    fetchPecas();
  }

  const fetchPecas = () => {
    setLoading(true);
    const params = new URLSearchParams({
      pesquisa,
    });

    console.log('Teste')

    setData([{
      descricao: 'Componente 1 com a descrição técnica do mesmo',
      valor: 936.00,
      imagem: null,
    },
    {
      descricao: 'Componente 2 com a descrição técnica do mesmo',
      valor: 1005.50,
      imagem: null,
    },
    {
      descricao: 'Componente 3 com a descrição técnica do mesmo',
      valor: 783.99,
      imagem: null,
    },
    {
      descricao: 'Componente 4 com a descrição técnica do mesmo',
      valor: 430.00,
      imagem: null,
    },
    {
      descricao: 'Componente 5 com a descrição técnica do mesmo',
      valor: 2500.00,
      imagem: null,
    }]);
    
    // fetch(`/pecas/'+peca+'?${params}`, { method: 'GET' }) 
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error('Erro na requisição');
    //     }
    //     return response.json();
    //   })
    //   .then((result) => {
    //     setData(result);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     Modal.error({
    //       title: 'Erro ao buscar peças',
    //       content: error.message,
    //       style: { whiteSpace: 'pre-wrap' }
    //     });
    //     setLoading(false);
    //   });

    setLoading(false);
  }

  const selecionaPeca = (peca) => { 
    setLoading(true);
    console.log('peca',peca);    
    recebePeca(peca);
    setVisible(false);
  }

  const afterClose = () => {
    setLoading(false);
  }

  return (
    <span>
      <span onClick={modal}>
        {children}
      </span>
      <Modal open={visible}
        title={peca}
        width={1800}
        okText='Salvar'
        centered
        destroyOnClose
        afterClose={afterClose}
        onCancel={() => setVisible(false)}
        footer={
					<React.Fragment>
							<Button onClick={() => setVisible(false)}>
								Cancelar
							</Button>
					</React.Fragment>
				}>
        <Row gutter={[10,10]}
          justify={'space-between'}>
          <Col span={20}>
            <Row gutter={10}>
              <Col span={22}>
                <Input title='Pesquisar'
                  placeholder='Pesquisar...'
                  onChange={({target: {value}}) => {setPesquisa(value)}}/>
              </Col>
              <Col span={2}>
                <Button >
                  <SearchOutlined />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button color='primary'
              variant='solid'>
              <FilterOutlined />
            </Button>
          </Col>
          <Col span={24}>
            <Table size='small'
              columns={columns}
              dataSource={data}
              loading={loading}
              rowKey={value => value?.descricao}
              pagination={{ pageSize: 5 }}
              bordered />
          </Col>
        </Row>
      </Modal>
    </span>
  );
}

ModalPecas.propTypes = {
  children: PropTypes.node,
  recebePeca: PropTypes.node,
};

export default ModalPecas;