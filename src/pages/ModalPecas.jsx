import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Table, Button, Input, Popover, Checkbox } from 'antd';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function ModalPecas({ children, peca = 'Peça', recebePeca }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [filtro, setFiltro] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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
      render: (value) => value.toFixed(2),
    },
    {
      title: '',
      width: 150,
      render: (_, row) => (
        <Button
          onClick={() => selecionaPeca(row)}
          style={{ backgroundColor: '#52C41A', color: '#FFFFFF' }} 
        >
          Adicionar Peça
        </Button>
      ),
    },
  ];

  const alteraValor = (checked, i) => {
    const nFiltro = [...filtro];

    nFiltro[i].valor = checked;

    setFiltro(nFiltro);
  }

  const setaItensFiltro = () => {
    if (peca === 'Processador') {
      setFiltro([
        { nome: 'Intel', valor: false},
        { nome: 'AMD', valor: false},
      ]);
    } else if (peca === 'Placa de Vídeo'){
      setFiltro([
        { nome: 'ASUS', valor: false},
        { nome: 'NVIDIA', valor: false},
        { nome: 'EVGA', valor: false},
        { nome: 'GALAX', valor: false},
        { nome: 'Gigabyte', valor: false},
      ]);
    }else if (peca === 'Placa Mãe'){
      setFiltro([
        { nome: 'ASUS', valor: false},
        { nome: 'Gigabyte', valor: false},
        { nome: 'MSI', valor: false},
        { nome: 'ASRock', valor: false},
      ]);
    } else if (peca === 'Memória RAM'){
      setFiltro([
        { nome: 'Corsair', valor: false},
        { nome: 'Kingston', valor: false},
        { nome: 'XPG', valor: false},
        { nome: 'Crucial', valor: false},
      ]);
    } else if (peca === 'Armazenamento'){
      setFiltro([
        { nome: 'Samsung', valor: false},
        { nome: 'Kingston', valor: false},
        { nome: 'SanDisk', valor: false},
        { nome: 'Crucial', valor: false},
      ]);
    } else if (peca === 'Fonte'){
      setFiltro([
        { nome: 'Antec', valor: false},
        { nome: 'Corsair', valor: false},
        { nome: 'EVGA', valor: false},
        { nome: 'Aerocool', valor: false},
      ]);
    } else if (peca === 'Gabinete'){
      setFiltro([
        { nome: 'Redragon', valor: false},
        { nome: 'Razer', valor: false},
        { nome: 'Pichau', valor: false},
        { nome: 'NZXT', valor: false},
      ]);
    }
  }

  const fetchPecas = () => {
    setLoading(true);

    setaItensFiltro();

    const pecas = [{
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
    }]

    setData(pecas);
    
    const params = new URLSearchParams({
      pesquisa,
    });

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

    setFilteredData(pecas); 
    setLoading(false);
  }

  useEffect(() => {
    if (visible) fetchPecas();
  }, [visible]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = data.filter((peca) =>
        peca.descricao.toLowerCase().includes(pesquisa.toLowerCase())
      );
      setFilteredData(filtered);
    }, 1000);

    return () => {clearTimeout(timeout);};
  }, [pesquisa, data]);

  const selecionaPeca = (peca) => { 
    setLoading(true);
    recebePeca(peca);
    setVisible(false);
  };

  const afterClose = () => {
    setLoading(false);
  };

  return (
    <span>
      <span onClick={(e) => { e.stopPropagation(); setVisible(true); }}>
        {children}
      </span>
      <Modal
        open={visible}
        title={peca}
        width={800}
        centered
        destroyOnClose
        afterClose={afterClose}
        onCancel={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>Cancelar</Button>}
      >
        <Row gutter={[10, 10]} justify="space-between">
          <Col span={20}>
            <Row gutter={10}>
              <Col span={22}>
                <Input placeholder={`Pesquisar ${peca}...`}
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}/>
              </Col>
              <Col span={2}>
                <Button >
                  <SearchOutlined />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Popover title='Filtro'
              trigger="click"
              placement='left'
              content={
                filtro.map((item, i) => (
                  <Row>
                    <Col>
                      <Checkbox checked={item.valor}
                        onChange={({target: {checked}}) => alteraValor(checked, i)}>
                        {item.nome}
                      </Checkbox>
                    </Col>
                  </Row>
                ))
              }>
              <Button color='primary'
                variant='solid'>
                <FilterOutlined />
              </Button>
            </Popover>
          </Col>
          <Col span={24}>
            <Table
              size="small"
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              rowKey={(value) => value.descricao}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Col>
        </Row>
      </Modal>
    </span>
  );
}

ModalPecas.propTypes = {
  children: PropTypes.node,
  peca: PropTypes.string,
  recebePeca: PropTypes.func.isRequired,
};

export default ModalPecas;
